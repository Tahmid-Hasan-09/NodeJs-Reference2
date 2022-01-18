require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('61e6cf6534d4a7bd4b987fd1').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({
//         completed : false
//     })
// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })

const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed:false});
    return count;
}

deleteTaskAndCount('61e6a1692475d6d665680bef').then((count)=>{
    console.log(count);
}).catch((error)=>{
    console.log(error);
})