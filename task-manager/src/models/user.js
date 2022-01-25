/**************** Require NPM package *************************/
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
/**************** Require Task Model *************************/
const Task = require('./task');

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
    },
    tokens:[
        {
            token:{
                type:String,
                required : true
            }
        } 
    ]
})
/**************** Virtual Property Of User Model********************/
userSchema.virtual('tasks',{
    ref:'Task',
    localField : '_id',
    foreignField : 'owner'
})

/**************** Custom method function for single instance get PublicProfile ********************/
userSchema.methods.toJSON = function(){ //userSchema.methods.getPublicProfile = function(){
    const user = this;
    const userObj = user.toObject();//Recreate a copy of the user variable

    delete userObj.password
    delete userObj.tokens
    
    return userObj
}
/**************** Custom method function for single instance generateAuthTokens ********************/
userSchema.methods.generateAuthTokens = async function(){
    const user = this
    const token = jwt.sign({_id : user._id.toString()},'thisismynewcourse');
    user.tokens.push({token});
    await user.save();
    return token;
}

/**************** Custom Model function findByCredentials *************************/
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

/*********************** Mongoose Middleware *************************/
/**************** Hash Password Before Saving to DB *************************/
userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8); 
    }
    next();
})
/**************** Delete User Tasks when User itself deleted *************************/
userSchema.pre('remove',async function(next){
    const user = this;
    await Task.deleteMany({owner:user._id});
    next();
})
/**************** Model Creation by mongoose.model method *************************/
const User = mongoose.model('User',userSchema);

module.exports = User