//Asynchronous NodeJs Reference Example by Order of Execution
// console.log('Starting')

// setTimeout(() => {
//     console.log('2 Second Timer')
// }, 2000)

// setTimeout(() => {
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stopping')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// Request mapbox geocoding API
geocode('Los Angels', (error, data) => {
    if (error) {
        return console.log(error);
    }
    console.log('Geocode', data);
    //Request weatherstack API for forecast    
    forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) {
            return console.log(error)
        }
        console.log(`${data.place} : ${forecastData}`)
    })
})
