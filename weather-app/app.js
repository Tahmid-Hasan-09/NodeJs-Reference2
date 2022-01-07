//Asynchronous NodeJs Reference Example by Order of Execution
// console.log('Starting')

// setTimeout(() => {
//     console.log('2 Second Timer')
// }, 2000)

// setTimeout(() => {
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stopping')


// Request mapbox geocoding API
const geocode = require('./utils/geocode');
geocode('Los Angels',(error,data)=>{
    if(error && data === undefined){
        console.log('Error',error);
    }else{
        console.log('Data',data);
    }    
})

//Request weatherstack API for forecast
const forecast = require('./utils/forecast');
forecast(44.1545,-75.7088, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})