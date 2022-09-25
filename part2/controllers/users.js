const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { nonExistingId } = require('../test/test_helper')
usersRouter.post('/', async (request, response,next) => {
  const body = request.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  try{
    const savedUser = await user.save()
    response.json(savedUser)}
  catch(e){ next(e)}
})

usersRouter.get('/', async ( request,response,next) => {
  try {const users = await User.find({}).populate('notes',{ content:1,date:1 })
    response.json(users)}
  catch(e){ next(e)}
})

module.exports = usersRouter
