require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('61e697a3b7b0a58251582318',{
//     age : 22
// }).then((user)=>{
//     console.log(user)
//     return User.countDocuments({age:22})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age:age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('61e697a3b7b0a58251582318', 20).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})