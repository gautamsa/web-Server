const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define path for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const port = process.env.PORT || 3000;

//set up handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title : 'Story of Linna',
        name: 'Satyam Singh'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'weather',
        name: 'Satyam Singh'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Linna',
        message: 'Very commly used image in field of image processing',
        name: 'Satyam Singh'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide address'
        });
    } else {
        const value = geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({error});
                }

                res.send({
                    forecastData,
                    location,
                    address: req.query.address
                });
            })
        });
    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error : 'please provide search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Linna',
        errorMessage: 'Help article not found',
        name: 'Satyam Singh'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Satyam Singh'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});