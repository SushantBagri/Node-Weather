const Axios = require('axios');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3VzaGFudGJhZ3JpIiwiYSI6ImNraGN6ZHNudDAweDgyeW52MHcxa3plcXQifQ.3zUZEFQE5Fv2jQAnOEffnw';

    Axios.get(url)
        .then(response => {
            const data={
                latitude: response.data.features[0].center[1],
                longitude: response.data.features[0].center[0],
                location: response.data.features[0].place_name
            }
            callback(undefined, data)
        })
        .catch(err => {
            callback('check your internet connection',undefined)
        })
}

module.exports=geocode;