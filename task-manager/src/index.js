const express = require('express')
require('./db/mongoose');
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

// app.post('/users',(req,res)=>{
//     const user = new User(req.body);
//     user.save().then((user)=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(404).send(error)
//     })
// })

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(404).send(e)
    }
})

// app.get('/users',(req,res)=>{
//     User.find({}).then((users)=>{
//         res.send(users)
//     }).catch((error)=>{
//         res.status(500).send()
//     })
// })

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

// app.get('/users/:id',(req,res)=>{
//     const _id = req.params.id;
//     User.findById(_id).then((user)=>{
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch((error)=>{
//         res.status(500).send()
//     })
// })

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

// app.post('/tasks',(req,res)=>{
//     const task = new Task(req.body);
//     task.save().then((task)=>{
//         res.status(201).send(task)
//     }).catch((error)=>{
//         res.status(404).send(error)
//     })
// })

app.post('/tasks',async (req,res)=>{
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

app.get('/tasks',async (req,res)=>{
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

app.get('/tasks/:id',async (req,res)=>{
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

app.patch('/tasks/:id',async (req,res)=>{
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

app.delete('/tasks/:id',async (req,res)=>{
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

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})