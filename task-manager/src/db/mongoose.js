const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser : true,
    //useCreateIndex : true
})

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type : String,
        required : true,
        trim : true,
        minLength : 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default : 0,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number');
            }
        }
    }
})

// const me = new User({
//     name: 'Mredul Jaman',
//     email : 'mredul123@gmail.com',
//     age: '24',
//     password : 'mredul123'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

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

const task1 = new Task({
    description : 'Eat Launch',
})

task1.save().then((task1)=>{
    console.log(task1);
}).catch((error)=>{
    console.log('Error!',error);
})