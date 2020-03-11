const request = require('request');
const querystring = require('querystring');

const getGeoCode = (url, location, callback) => {
    url = url.replace('<location_string>', querystring.escape(location));
    
    request({ url, json: true, strictSSL: false }, (error, response) => {
        if (!error) {
            const data = response.body.features[0];
            if (data) {
                const place_name = data.place_name;
                const longitude = data.center[0];
                const latitude = data.center[1];

                callback(undefined, { place_name, longitude, latitude });
            } else {
                error = 'No such location found. Please try a different search string.';
                callback(error, undefined);
            }
        } else {
            error = 'There was an error connecting to the Mapbox API.'
            callback(error, undefined);
        }
    });
}

module.exports = {
    getGeoCode: getGeoCode
};
