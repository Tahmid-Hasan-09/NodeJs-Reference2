const mongoose = require('mongoose');

/**************** Connect with database *************************/
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    //useCreateIndex : true,
    //useFindAndModify : false
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

// const task1 = new Task({
//     description : 'Eat Launch',
// })
// task1.save().then((task1)=>{
//     console.log(task1);
// }).catch((error)=>{
//     console.log('Error!',error);
// })