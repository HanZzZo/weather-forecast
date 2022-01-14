const rp = require('request-promise')

module.exports = async function(city = '') {
    if (!city) {
        throw new Error('Имя города не может быть пустым')
    }

   //получаем погоду 
   const KEY = '6375d6edefde8a5515aaecce4f82cdff'
   const uri ='http://api.openweathermap.org/data/2.5/weather'

   const options = {
        uri, //так как совпадает ключ и значение мы не пишем uri: uri
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'
        },
        json: true
    }

    try {
        const data = await rp(options)
        const celsius = (data.main.temp - 32) * 5/9

        return {
            weather: `${data.name}: ${celsius.toFixed(0)}`,
            error: null
        }
    } catch (error) {
        return {
            weather: null,
            error: error.error.massage
        }
    }

  
}