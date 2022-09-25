const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRoutes = require('./controllers/blogs')
const usersRoutes = require('./controllers/users')
const loginRoutes = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')


mongoose.connect(config.MONGOBLOGURL).then((response)=>{
 
    logger.info('Connected DB')
}).catch((e)=>{
    logger.error('Error to Connect DB')
})
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
 if(config.NODE==='test')
 {
    const resetRouter= require('./controllers/reset')
    app.use('/api/testing',resetRouter)
 }
app.use('/api/login', loginRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/blogs', blogsRoutes)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app