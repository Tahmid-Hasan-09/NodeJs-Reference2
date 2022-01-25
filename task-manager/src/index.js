/**************** Require NPM Express *************************/
const express = require('express')
/**************** Connect with mongoDB with NPM mongoose package *************************/
require('./db/mongoose');

/**************** Set up app & port *************************/
const app = express()
const port = process.env.PORT || 3000

/**************** Require Routes from separate files *************************/
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task')

/**************** Parse JSON file from req.body *************************/
app.use(express.json())

/**************** Use As middleware function for all routes *************************/
// app.use((req,res,next)=>{
//     console.log(req.method,req.path);//For getting route method & route handler path
//     if(req.method === 'GET'){
//         res.send('GET  requests are disabled');
//     }else{
//         next();
//     }   
// })
// app.use((req,res,next)=>{
//     res.status(503).send('Site is currently Down,Check Back Soon!');
// })

/**************** Register route files from different places *************************/
app.use(userRouter)
app.use(taskRouter)

/**************** routes for listening ports *************************/
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
