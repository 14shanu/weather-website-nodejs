const request = require('request')

const forecast =(latitude,longitude , callback) => {
    const url ='http://api.weatherstack.com/current?access_key=036fab13e62e2ec7ce2835b05781c379&query='+latitude+','+longitude+'&units=m'

    request ({url , json : true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try different loctaion' , undefined)
        } else {
            callback(undefined , body.current.weather_descriptions[0] +'. It is currently '+body.current.temperature + ' degrees out. '+ 'It feels like ' +body.current.feelslike + ' degree out. The wind speed is '+body.current.wind_speed+' and humidity is '+body.current.humidity)
        }
    })
}

module.exports = forecast