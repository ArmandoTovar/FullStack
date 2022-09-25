const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const booksRouter  = require('./controllers/books')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware= require('./utils/middleware')
const mongoose = require('mongoose')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
if(config.NODE=== 'test')
{
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing',testingRouter)
}
app.use('/api/login',loginRouter)
app.use('/api/users',usersRouter)
app.use(middleware.requestLogger)


app.use('/api/notes', notesRouter)
app.use('/api/books',booksRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app