const users = []

// addUser, removeUser, getUser, getUsersInRoom
//addUser
const addUser = ({id,username,room})=>{
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if(!username || !room){
        return{
            error: 'Username and room are required!'
        }
    }

    // Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validate username
    if (existingUser) {
        return {
            error: 'Username is in use!'
        }
    }

    // Store user
    const user = {
        id,
        username,
        room
    }
    users.push(user)
    return {user}
}

//removeUser
const removeUser = (id)=>{
    const index = users.findIndex((user)=> user.id === id)
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

//getUser
const getUser = (id) => {
    return users.find((user) => user.id === id)
}

//getUsersInRoom
const getUserInRoom = (room)=>{
    room = room.trim().toLowerCase()
    return users.filter((user)=>user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUserInRoom
}


/******************** Demo Element Creation by calling function
const user1= addUser({
    id:22,
    username:'Tahmid Hasan',
    room:'test'
})
const user2 = addUser({
    id:23,
    username:'Hasan',
    room:'test'
})
const user3 = addUser({
    id:24,
    username:'adsHasan',
    room:'another'
})

console.log(users)
const userbyid = getUser(22)
const userinroom = getUserInRoom('test')
console.log(userbyid)
console.log(userinroom)
*********************************/

