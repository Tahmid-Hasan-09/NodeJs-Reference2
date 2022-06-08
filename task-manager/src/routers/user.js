/**************** Require NPM Express *************************/
const express = require('express');
/**************** Setup express Router method *************************/
const router = new express.Router();
/**************** Require User Model *************************/
const User = require('../models/user')
/**************** Require Middleware function *************************/
const auth = require('../middleware/auth');
/**************** Require NPM multer modules *************************/
const multer  = require('multer')
/**************** Require NPM sharp package *************************/
const sharp = require('sharp');
/************ Require transactional email automation function ************/
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/sendgrid')

/**************** Create User Routes *************************/
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save();

        /** Send welcome mail automated **/
        //sendWelcomeEmail(user.email, user.name)

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
        // res.send({user:user.getPublicProfile(),token});//Hide Data by creating custom method
        res.send({user,token});
    }catch(error){
        res.status(400).send();
    }
})

/**************** User Log Out Route for current session(current authToken) **************/
router.post('/users/logout',auth,async (req,res)=>{
    try{
       req.user.tokens = req.user.tokens.filter((token)=>{
           return token.token !==req.token;
       }) 
       await req.user.save();
       res.send('You are successfully logged out');
    }catch(error){
        res.status(500).send();
    }
})

/**************** User Log Out Route for all session(all authToken) **************/
router.post('/users/logoutAll',auth,async (req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send('You are logged out from all sessions')
    }catch(error){
        res.status(500).send();
    }
})

/**************** Read Single User Profile Route *************************/
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user);
})

/**************** Update User Route *************************/
router.patch('/users/me',auth, async (req, res) => {
    /**************** Send 404 if client tries to update non-existent field ***********/
    const updates = Object.keys(req.body) //Convert Object to array of object keys
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //Without Save method mongoose middleware cannot be applied
        updates.forEach((update)=>{
            req.user[update] = req.body[update] // access a object property dynamically use 
                                                // bracket notation
        })
        await req.user.save();    
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

/**************** Delete User Route *************************/
router.delete('/users/me',auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        await req.user.remove();

        /***Send cancellation mail automated***/
        //sendCancelationEmail(req.user.email, req.user.name)
        
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

/**************** Upload Files by multer package *************************/
const upload = multer({
    // dest: 'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a jpg/jpeg/png image'))
        }
        cb(undefined,true)
    }
})
/**************** File Upload Route *************/
router.post('/users/me/avatar',auth, upload.single('avatar'), async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})
/**************** File Upload Delete Route *******/
router.delete('/users/me/avatar', auth, async(req,res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

/**************** Get the profile image by id instead of binary image  *******/
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


/**************** Sending all routes by module.exports method *************************/
module.exports = router




/************************* Older Routes Before Update *************************/
/**************** Create User Routes *************************/
// app.post('/users',(req,res)=>{
//     const user = new User(req.body);
//     user.save().then((user)=>{
//         res.status(201).send(user)
//     }).catch((error)=>{
//         res.status(404).send(error)
//     })
// })

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

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

/**************** Update User Route *************************/
// router.patch('/users/:id', async (req, res) => {
//     /**************** Send 404 if client tries to update non-existent field ***********/
//     const updates = Object.keys(req.body) //Convert Object to array of keys
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const user = await User.findById(req.params.id);
//         //Without Save method middleware cannot be applied
//         updates.forEach((update)=>{
//             user[update] = req.body[update] // access a object property dynamically use 
                                               // bracket notation
//         })
//         await user.save();
//         // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }) // cannot use when with mongoose middleware applied
    
//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

/**************** Delete User Route *************************/
// router.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)

//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })