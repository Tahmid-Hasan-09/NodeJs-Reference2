const socket = io() // Uses websocket and connects to server

// server(emit) -> client(recieve) - acknowledgement --> server
// client(emit) -> server(recieve) - acknowledgement --> client

//DOM targeting elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#locationMessage-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

//Using Qs Library to parse query string from client-side javascript
const {username,room} = Qs.parse(location.search,{ignoreQueryPrefix:true})

//Auto Scroll Function
const autoscroll = () => {
    // New message element
    const $newMessage = $messages.lastElementChild

    // Height of the new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // Visible height
    const visibleHeight = $messages.offsetHeight

    // Height of messages container
    const containerHeight = $messages.scrollHeight

    // How far have I scrolled?
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

//Listening message event
socket.on('message',(message)=>{
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        username:message.username,
        message:message.text,
        createdAt : moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoscroll()
})

//Listens location message
socket.on('locationMessage',(location)=>{
    console.log(location)
    const html = Mustache.render(locationTemplate,{
        username:location.username,
        locationUrl:location.locationUrl,
        createdAt:moment(location.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend',html)
    autoscroll()
})

//Listens Room Data
socket.on('roomData',({room,users})=>{
    const html = Mustache.render(sidebarTemplate,{
        room,
        users
    })
    document.querySelector('#sidebar').innerHTML = html
})

//message form submission
$messageForm.addEventListener('submit',(event)=>{
    event.preventDefault()

    //disable the send button until acknowledgement by server
    $messageFormButton.setAttribute('disabled','disabled')

    const message = event.target.elements.message.value

    //Acknowledgement of sending event from client to server by a third argument callback function
    socket.emit('sendMessage',message,(profanity)=>{
        //enable the message send button after acknowledgement done
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()

        if(profanity){
            return console.log(profanity)
        }
        console.log('Message Delivered!')
    })
})

$sendLocationButton.addEventListener('click',()=>{
    //disable the send Location button until acknowledgement by server
    $sendLocationButton.setAttribute('disabled','disabled')

    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser.')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(position)

        //Acknowledgement of sending event from client to server by a third argument callback function
        socket.emit('sendLocation',{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        },()=>{
            //enable the send location button after acknowledgement done
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})

//Send join event to join specific room along with username
socket.emit('join',{
    username:username,
    room:room
},(error)=>{
    if(error){
        alert(error)
        location.href = '/'
    }
})




/*********************** Reference Code Demo ****************/
// /***** socket.on method recieves event from server *****/
// socket.on('updatedCount',(count)=>{
//     console.log('The count has been updated',count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('clicked')
//     /***** socket.on method send event to server *****/
//     socket.emit('increment')
// })
/******************************************************** *****/