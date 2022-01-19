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

/**************** Register route files from different places *************************/
app.use(userRouter)
app.use(taskRouter)

/**************** routes for listening ports *************************/
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})