require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('61e697a3b7b0a58251582318',{
    age : 22
}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:22})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})
