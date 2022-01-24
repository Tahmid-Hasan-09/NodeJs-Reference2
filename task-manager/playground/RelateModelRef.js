require('../src/db/mongoose')
const Task = require('../src/models/task');
const User = require('../src/models/user')
const main = async ()=>{
    // const task = await Task.findById('61ee3c8d59b47d6f5db59b52').populate('owner').exec();
    // console.log(task.owner)
    const user = await User.findById('61ee3c6059b47d6f5db59b4c').populate('tasks').exec()
    console.log(user.tasks)
}
main()