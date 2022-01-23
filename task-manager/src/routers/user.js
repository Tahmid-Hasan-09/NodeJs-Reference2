/**************** Require NPM Express *************************/
const express = require('express');
/**************** Setup express Router method *************************/
const router = new express.Router();
/**************** Require User Model *************************/
const User = require('../models/user')
/**************** Require Middleware function *************************/
const auth = require('../middleware/auth');

/**************** Create User Routes *************************/
// app.post('/users',(req,res)=>{
//     const user = new User(req.body);
//     user.save().then((user)=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(404).send(error)
//     })
// })

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();
        //Generate a token & Send Back to the Saved User
        const token = await user.generateAuthTokens();
        res.status(201).send({user:user,token:token})
    } catch (e) {
        res.status(404).send(e)
    }
})

/**************** User Login Route *************************/
router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        //Generate a token & Send Back to the User
        const token = await user.generateAuthTokens();
        res.send({user,token});
    }catch(error){
        res.status(400).send();
    }
})

/**************** Read Users Route *************************/
// app.get('/users',(req,res)=>{
//     User.find({}).then((users)=>{
//         res.send(users)
//     }).catch((error)=>{
//         res.status(500).send()
//     })
// })

// router.get('/users', auth, async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

/**************** Read Single User Profile Route *************************/
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user);
})

/**************** Read Single id User Route *************************/
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

router.get('/users/:id', async (req, res) => {
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

/**************** Update User Route *************************/
router.patch('/users/:id', async (req, res) => {
    /**************** Send 404 if client tries to update non-existent field ***********/
    const updates = Object.keys(req.body) //Convert Object to array
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id);
        //Without Save method middleware cannot be applied
        updates.forEach((update)=>{
            user[update] = req.body[update]
        })
        await user.save();
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/**************** Delete User Route *************************/
router.delete('/users/:id', async (req, res) => {
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

/**************** Sending all routes by module.exports method *************************/
module.exports = router