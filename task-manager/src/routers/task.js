const express = require('express')
const router = new express.Router();
const Task = require('../models/task')

// app.post('/tasks',(req,res)=>{
//     const task = new Task(req.body);
//     task.save().then((task)=>{
//         res.status(201).send(task)
//     }).catch((error)=>{
//         res.status(404).send(error)
//     })
// })

router.post('/tasks',async (req,res)=>{
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task)
    }catch(error){
        res.status(404).send(error)
    }
})

// app.get('/tasks',(req,res)=>{
//     Task.find({}).then((tasks)=>{
//         res.send(tasks)
//     }).catch((error)=>{
//         res.status(500).send(error)
//     })
// })

router.get('/tasks',async (req,res)=>{
    try{
        const tasks = await Task.find({});
        res.send(tasks)
    }catch(error){
        res.status(500).send(error)
    }
})

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

router.get('/tasks/:id',async (req,res)=>{
    try{
        const task = await Task.findById(req.params.id);
        if(!task){
            return res.status(404).send()
        }
        res.status(201).send(task)
    }catch(error){
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id',async (req,res)=>{
    const updates = Object.keys(req.body);//convert objects to array(object keys array)
    const allowedUpdates = ['description','completed'];
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates!'})
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id,req.body,{ new:true, runValidators:true });
        if(!task){
            return res.status(404).send();
        }
        res.status(202).send(task);
    }catch(error){
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id',async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(error){
        res.status(500).send();
    }
})

module.exports = router