const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=966a327fcb2b6052df9d5978b530b01a&query=' + latitude + ',' + longitude + '&units=f'
    const json = true
    request({ url, json }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!! ', undefined)
        } else if (body.error) {
            console.log(url)
            callback('Invalid Input!', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })

}

module.exports = forecast