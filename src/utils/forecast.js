const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=a60d94c5c4c08a4824b7c01eacffb808&query=${long}, ${lat}&units=m`
    request({ url: url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is now ${body.current.temperature} degree outside. It feels like ${body.current.feelslike} degree. There is a ${body.current.precip}% chance of raining. The wind speed is currently ${body.current.wind_speed}.`);
        }
    })
}

module.exports = forecast;