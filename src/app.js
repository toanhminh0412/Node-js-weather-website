const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Minh To'
    })
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Minh To'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Cannot get 404',
        title: 'Help',
        name: 'Minh To'
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404',
        errorMessage: 'Help Page not found',
        name: 'Minh To'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecast(data.latitude, data.longitude, (forecastError, forecastData) => {
                if (forecastError) {
                    return res.send({
                        error: forecastError
                    })
                } else {
                    res.send({
                        forecast: forecastData,
                        location: data.location,
                        address: req.query.address
                    })
                }
            })
        }
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Minh To'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});