/**************** Require NPM mongoose package *************************/
const mongoose = require('mongoose');

/**************** Model Creation by mongoose.model method *************************/
const Task = mongoose.model('Task',{
    description : {
        type : String,
        trim : true,
        required : true
    },
    completed : {
        type : Boolean,
        required : false,
        default : false
    }
})

module.exports = Task