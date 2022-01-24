/**************** Require NPM mongoose package *************************/
const mongoose = require('mongoose');

/**************** Schema Creation by mongoose.Schema method *************************/
const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        trim : true,
        required : true
    },
    completed : {
        type : Boolean,
        required : false,
        default : false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required : true,
        ref :'User'
    }
})
/**************** Model Creation by mongoose.model method *************************/
const Task = mongoose.model('Task',taskSchema)

module.exports = Task