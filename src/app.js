const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


//setup handle bar engine
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))

//setup static files
app.use(express.static(path.join(__dirname, '../public')))

//Register partials
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sambit Choudhury'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sambit Choudhury'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Help will be provided to those who will ask for it!',
        title: 'Help',
        name: 'Sambit Choudhury'

    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address!"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData={}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            return res.send({
                Forecast: forecastData,
                Location: location,
                Address: req.query.address
            })
        })

    })


})
app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})
app.get('/help/*', (req, res) => {
    res.render('notfound', {
        title: '404 Not Found',
        name: 'Sambit Choudhury',
        error: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('notfound', {
        title: '404 Not Found',
        name: 'Sambit Choudhury',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
}) //starts up the server