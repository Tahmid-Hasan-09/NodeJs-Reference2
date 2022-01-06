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
//Request weatherstack API
const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=42.3605,-71.0596&units=f';

request({
    url: url,
    json: true
}, (error, response) => {
    console.log(`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degress out.It feels like ${response.body.current.feelslike} degrees out`)
})

//Request mapbox geocoding API
const uri = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoidGFobWlkLWhhc2FuIiwiYSI6ImNreTJ0b3dzcjBqeTkyb255dWxidHgxY3QifQ.aWPyDh9Z8VsTaESckyIhCA';

request({
    uri:uri,
    json:true
},(error,response)=>{
    console.log(`${response.body.features[0].place_name}, Longitude:${response.body.features[0].center[0]},Latitude:${response.body.features[0].center[1]}`)
})