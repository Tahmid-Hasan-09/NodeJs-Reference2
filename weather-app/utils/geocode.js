const request = require('request');

const geocode = (address, callback) => {
    const uri = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidGFobWlkLWhhc2FuIiwiYSI6ImNreTJ0b3dzcjBqeTkyb255dWxidHgxY3QifQ.aWPyDh9Z8VsTaESckyIhCA`;

    // request({
    //     uri: uri,
    //     json: true
    // }, (error, response) => {
    //     if (error) {
    //         callback('Unable to connect to weather service!', undefined);
    //     } else if (response.body.features.length === 0) {
    //         callback('Unable to find location', undefined);
    //     } else {
    //         callback(undefined, {
    //             longitude: response.body.features[0].center[0],
    //             latitude: response.body.features[0].center[1],
    //             place: response.body.features[0].place_name
    //         });
    //     }
    // })
    //Another Version with Replacing with object destructuring & Object property Shorthand
    request({
        uri,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            });
        }
    })
}


module.exports = geocode