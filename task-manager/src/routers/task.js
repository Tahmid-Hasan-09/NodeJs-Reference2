/**************** Require NPM Express *************************/
const express = require('express')
/**************** Setup express Router method *************************/
const router = new express.Router();
/**************** Require Task Model *************************/
const Task = require('../models/task')
/**************** Require auth middleware *************************/
const auth = require('../middleware/auth');

/**************** Create Task Routes *************************/
// app.post('/tasks',(req,res)=>{
//     const task = new Task(req.body);
//     task.save().then((task)=>{
//         res.status(201).send(task)
//     }).catch((error)=>{
//         res.status(404).send(error)
//     })
// })

router.post('/tasks',auth,async (req,res)=>{
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    try {
        await task.save();
        res.status(201).send(task)
    }catch(error){
        res.status(404).send(error)
    }
})

/**************** Read Tasks Route *************************/
// app.get('/tasks',(req,res)=>{
//     Task.find({}).then((tasks)=>{
//         res.send(tasks)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })
// })

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks',auth,async (req,res)=>{
    const match = {};
    const sort = {};
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':'); //split/separate string by special character
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try{
        await req.user.populate({
            path: 'tasks',
            match:match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                // sort:{
                //     createdAt : desc
                // }
                sort
            }
        })
        res.send(req.user.tasks)
    }catch(error){
        res.status(500).send(error)
    }
})

/**************** Read Single id task Route *************************/
// app.get('/tasks/:id',(req,res)=>{
//     Task.findById(req.params.id).then((task)=>{
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task) 
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })
// })

router.get('/tasks/:id',auth,async (req,res)=>{
    try{
        const task = await Task.findOne({ _id:req.params.id, owner:req.user._id })
        console.log(task)
        if(!task){
            return res.status(404).send()
        }
        res.status(201).send(task)
    }catch(error){
        res.status(500).send(error)
    }
})

/**************** Update Task Route *************************/
router.patch('/tasks/:id',auth,async (req,res)=>{
    /**************** Send 404 if client tries to update non-existent field ***********/
    const updates = Object.keys(req.body);//convert objects to array(object keys array)
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates!'})
    }

    try{
        //Without Save method middleware cannot be applied
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators:true });
        if(!task){
            return res.status(404).send();
        }
        updates.forEach((update)=>{
            task[update] = req.body[update]
        })
        await task.save();
        res.status(202).send(task);
    }catch(error){
        res.status(400).send(error)
    }
})

/**************** Delete Task Route *************************/
router.delete('/tasks/:id',auth,async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id, owner:req.user._id})
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(error){
        res.status(500).send();
    }
})

/**************** Sending all routes by module.exports method *************************/
module.exports = router