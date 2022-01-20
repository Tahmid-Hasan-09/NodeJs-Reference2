/**************** Require NPM package *************************/
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

/**************** Schema Creation by mongoose.Schema method *************************/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        trim : true
    },
    email:{
        type : String,
        unique : true,
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

/**************** Custom method/function findByCredentials *************************/
userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email:email});
    if(!user){
        throw new Error('Unable to Login!');
    }else{
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            throw new Error('Unable to login!');
        }else{
            return user;
        }
    }
}

/**************** Hash Password Before Saving to DB *************************/
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8); 
    }
    next();
})
/**************** Model Creation by mongoose.model method *************************/
const User = mongoose.model('User',userSchema);

module.exports = User