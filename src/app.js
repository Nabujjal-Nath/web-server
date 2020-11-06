const path = require('path')
const express = require('express');
const geocode = require('./geocode')
const forcast = require('./forcast')

const app = express();
const hbs = require('hbs');
publicDirPath = path.join(__dirname, '../public');
viewPath = path.join(__dirname, '../templates/views');
partialPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'hbs');
app.set('views', viewPath);
app.use(express.static(publicDirPath));
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
    res.render('index.hbs', {   
        title: "Weather",
        value: 1234
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, data) => {
        // console.log('Error',error)
        if (error) {
            return res.send({
                error
            })
        }

        forcast(data.latitude, data.longitude, (error, mdata) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forcast: mdata,
                location: data.location,

            })

        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nabujjal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Enter your location to get the weather report.',
        title: 'Help',
        name: 'Nabujjal'
    })
})

app.get('*', (req, res) => {
    res.render('404.hbs',{
        title:'404',
        errorMessage:'Page not found'
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})