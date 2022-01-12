console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();//Prevent Browser From Auto -Refresh after the event happened
    const location = search.value;
    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => { 
            // console.log(data)
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})