const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

const moviesRoute = require('./api/routes/movies')
    
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cors())

app.use('/', moviesRoute)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app