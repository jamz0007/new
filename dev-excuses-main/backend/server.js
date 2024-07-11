'use strict'

const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
const excusesRoutes = require('./routes/excuse.routes')

const PORT = process.env.PORT

// create an Express application
const app = express()

// allow the application to make requests to and receive responses from other domains or ports
app.use(cors())

// support application/json type post data
app.use(express.json())

// routes
app.use('/api/excuse', excusesRoutes)

// server
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = server

