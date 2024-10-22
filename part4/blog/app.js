const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils.logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  }).catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', blogsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
