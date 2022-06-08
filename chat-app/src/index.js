const express = require('express')
const path = require('path')
const http = require('http') //core nodejs module
const socketio = require('socket.io') //webSocket library
/***** Detect Bad/profane words *****/
const Filter = require('bad-words')
const {generateMessage,generateLocationMessage} = require('./utils/messages')
const {addUser,removeUser,getUser,getUserInRoom} = require('./utils/users')

const app = express()

/***** manually create server by http module otherwise express auto make it behind *****/
const server = http.createServer(app) 
/***** Make an instance/client connect of web Socket with that server *****/
const io = socketio(server)

const port = process.env.PORT
const publicDirectoryPath = path.join(__dirname,'../public')

app.use(express.static(publicDirectoryPath))

// let count = 0

// server(emit) -> client(recieve) - updatedCount
// client(emit) -> server(recieve) - increment

/***** connection event *****/
io.on('connection',(socket)=>{
    console.log('New WebSocket Connection')

    //Listens Specific room by join event
    socket.on('join',(options,callback)=>{//socket.on('join',({username,room})=>{

        //store username,room and default socket id in an array
        const {error,user} = addUser({id:socket.id, ...options})

        if(error){
            return callback(error)
        }

        //Join specific room to connected socket
        socket.join(user.room)

        //Send a simple demo welcome message
        socket.emit('message',generateMessage('Admin' , 'welcome!'))
        //Send event or message to all client or socket except current one connected 
        socket.broadcast.to(user.room).emit('message',generateMessage('Admin', `${user.username} has joined!`))
        //Send every connected socket/clients user-list of specific room
        io.to(user.room).emit('roomData',{
            room:user.room,
            users:getUserInRoom(user.room)
        })

        //Send Acknowledgement by declaring callback
        callback()

        // socket.emit, io.emit, socket.broadcast.emit
        // io.to.emit, socket.broadcast.to.emit
    })

    //Acknowledgement with bad-word npm package implementation
    socket.on('sendMessage',(message,callback)=>{
        const filter = new Filter()

        //Bad-Word Checking
        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!')
        }

        //Retrieve current connected socket id
        const user = getUser(socket.id)
        //Sending Event to the specific room of connected socket
        io.to(user.room).emit('message',generateMessage(user.username,message))
        //Sending acknowledgement by calling callback parameter function
        callback()
    })

    //Recieves location(latitude & longitude) from client
    socket.on('sendLocation',(coords,callback)=>{
        //Retrieve current connected socket id
        const user = getUser(socket.id)
        //Send location to all connected sockets
        io.to(user.room).emit('locationMessage',generateLocationMessage(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })


    //Send event or message when Disconnect socket or client
    socket.on('disconnect',()=>{
        //Remove User From Array while disconnecting
        const user = removeUser(socket.id)

        if(user){
            io.to(user.room).emit('message',generateMessage('Admin', `${user.username} has left!`))

            //Send every connected socket/clients user-list of specific room after disconnecting
            io.to(user.room).emit('roomData',{
                room:user.room,
                users:getUserInRoom(user.room)
            })
        }
    })

    /*********************** Reference Code Demo ****************/
    // //send event to client
    // socket.emit('updatedCount',count)
    // //Recieves event from client
    // socket.on('increment',()=>{
    //     count++
    //     // socket.emit('updatedCount',count)//For single client/socket connection
    //     io.emit('updatedCount',count) //Send event to all connected client
    // })
    /******************************************************** *****/
})


server.listen(port,()=>{
    console.log(`Server is up on port ${port}`)
})