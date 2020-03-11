const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
// Setting up server port for Heroku deployment
const port = process.env.PORT | 8080;

// Define paths for Express config
const public_dirname = path.join(__dirname, '../public');
const views_dirname = path.join(__dirname, '../templates/views');
const partials_dirname = path.join(__dirname, '../templates/partials');

// Setting up handlebars view engine for Express
app.set('view engine', 'hbs');
app.set('views', views_dirname);
hbs.registerPartials(partials_dirname);

// Serving static content
app.use(express.static(public_dirname));

// External API URLs
const MAPBOX_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/<location_string>.json?access_token=pk.eyJ1IjoiZ2F1cmF2LXJhbmEiLCJhIjoiY2s3Z2tucHU2MDBteDNscDl1eHllaXg2YSJ9.9zVCpsuWNGD4FCq0YN7AXw&limit=1';
const DARKSKY_URL = 'https://api.darksky.net/forecast/0d89c7d33523a41590104a844a7f792c/[latitude],[longitude]?units=si&lang=en';

// Route handlers -start

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Gaurav'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Gaurav',
        helpText: 'This is where the help text would come'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Gaurav'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.location) {
        return res.send({
            error: 'Please provide the location.'
        });
    }
    
    geocode.getGeoCode(MAPBOX_URL, req.query.location, (error, response) => {
        if (response) {
            weather.getWeather(DARKSKY_URL, response, (error, response) => {
                if (response) {
                    return res.send({
                        forecast: response
                    });
                } else {
                    return res.send({error});
                }
            });
        } else {
            return res.send({error});
        }
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Help not available',
        name: 'Gaurav',
        errorText: 'Help article for this topic is not available'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page not found',
        name: 'Gaurav',
        errorText: 'This page does not exist.'
    });
});

// Route handlers - end

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});