const request = require('request');

const geocode = (address, callback) => {
    address = address.replace(/\s/g, '');
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidG9hbmhtaW5oMDQxMiIsImEiOiJja2RzNmY3NjIxbTk5MnJtaHV5bDkxOThjIn0.pBteuRTVKLU7gV6Lge_cdw&limit=1`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (response.body.message) {
            callback('Search failed. Try another search.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            callback(undefined, { latitude: response.body.features[0].center[0], longitude: response.body.features[0].center[1], location: response.body.features[0].place_name });
        }
    })
}

module.exports = geocode;