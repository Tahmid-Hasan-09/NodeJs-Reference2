const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=${latitude},${longitude}&units=f`;

    // request({
    //     url: url,
    //     json: true
    // }, (error, response) => {
    //     if (error) {
    //         callback('Unable to connect to weather service!',undefined);
    //     } else if (response.body.error) {
    //         callback('Unable to find location',undefined);
    //     } else {
    //         callback(undefined,`${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degress out.It feels like ${response.body.current.feelslike} degrees out`)
    //     }
    // })
    //Another Version with Replacing with object destructuring & Object property Shorthand
    request({
        url,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined);
        } else if (body.error) {
            callback('Unable to find location',undefined);
        } else {
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out.It feels like ${body.current.feelslike} degrees out`)
        }
    })
}

module.exports = forecast