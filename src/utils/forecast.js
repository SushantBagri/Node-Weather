const Axios = require('axios');

const forecast = (latitude, longitude, callback) => {
    const params = {
        access_key: `841872e8a87cddc48c2b8bb3cf151c94`,
        query: `${latitude},${longitude}`
    }
    Axios.get('http://api.weatherstack.com/current', { params })
        .then(response => {
            if (response.data.error) {
                callback('Enter another place',undefined)
            }
            else {
                callback(undefined,response.data)
            }
        })
        .catch(err => callback('Please try again.',undefined))
}

module.exports = forecast;