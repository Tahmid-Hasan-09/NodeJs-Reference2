/**************** Require NPM package *************************/
const mongoose = require('mongoose');
const validator = require('validator');

/**************** Model Creation by mongoose.model method *************************/
const User = mongoose.model('User', {
    name: {
        type: String,
        required : true,
        trim : true
    },
    email:{
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        validate(value){ //Custom Validation method
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid') //Register/Show new Error
            }
        }
    },
    password:{
        type : String,
        required : true,
        trim : true,
        minLength : 7,
        validate(value){ //Custom Validation method
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"')//Register/Show new Error
            }
        }
    },
    age: {
        type: Number,
        default : 0,
        validate(value){ //Custom Validation method
            if(value<0){
                throw new Error('Age must be a positive number');//Register/Show new Error
            }
        }
    }
})

module.exports = User