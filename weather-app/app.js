//Asynchronous NodeJs Reference Example by Order of Execution
// console.log('Starting')

// setTimeout(() => {
//     console.log('2 Second Timer')
// }, 2000)

// setTimeout(() => {
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stopping')

const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=f5c5905d76ac22f35975a58445c02529&query=New%20York'

request({ url: url }, (error, response) => {
    const data = JSON.parse(response.body)
    console.log(data.current)
})