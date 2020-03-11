const request = require('request');

const getWeather = (url, { place_name, longitude, latitude }, callback) => {
    url = url.replace('[latitude]', latitude);
    url = url.replace('[longitude]', longitude);

    request({ url, json: true, strictSSL: false }, (error, {body}) => {
        if (!error) {
            if (body.error) {
                error = body.error;
                callback(error, undefined);
            } else {
                response = 'At ' + place_name + '; it would be: ' + body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees and chance of rain is ' + body.currently.precipProbability + '%.';
                callback(undefined, response);
            }
        } else {
            error = 'There was an error connecting to the Darksky API.';
            callback(error, undefined);
        }
    });
}

module.exports = {
    getWeather: getWeather
};
