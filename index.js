__author__ = 'Horleryheancarh'


// Imports
const express = require('express')
const { connect } = require('mongoose')
require('dotenv').config()


// Presets
const app = express()
app.use(
    express.urlencoded({ extended: true }),
    express.json()
)


// DB Presets
// connecting to DB
connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to db successfully')
}).catch(err => {
    console.log(err, 'Could not connect to db. Exiting now...')
    process.exit();
})


// Routes
app.use(require('./routes/userRoute'))


// Server
app.listen(process.env.PORT, () => console.log('Server listening on port ', process.env.PORT))
