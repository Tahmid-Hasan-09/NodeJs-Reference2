require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('61e6cf6534d4a7bd4b987fd1').then((task)=>{
    console.log(task)
    return Task.countDocuments({
        completed : false
    })
}).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})