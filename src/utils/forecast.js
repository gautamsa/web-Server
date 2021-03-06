const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8f3989ebc02664c39ef9b68af59907db/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperatureHigh = 'Temperature High : ' + body.daily.data[0].temperatureHigh + ' ';
            const temperatureLow = 'Temperature Low : ' + body.daily.data[0].temperatureLow + ' ';
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain. ' + temperatureHigh + temperatureLow )
        }
    })
}

module.exports = forecast