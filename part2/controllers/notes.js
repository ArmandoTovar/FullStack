const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer '))
  {
    return authorization.substring(7)
  }
  return null
}

notesRouter.get('/', (request, response) => {
  Note.find({}).populate('user',{ username:1,name:1 })
    .then((notes) => {
      response.json(notes)
    })
})
notesRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then((result) => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).end()
      }
    })
    .catch((e) => next(e))
})
notesRouter.put('/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body
  const note = {
    important: body.important,
  }
  console.log(note)
  Note.findByIdAndUpdate(id, note, { new: true })
    .then((updatedNote) => {
      console.log(updatedNote)
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})
notesRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id

  Note.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})
notesRouter.post('/',async (request, response, next) => {
  try{
    const body = request.body
    const token =  getTokenFrom(request)
    const decodedToken = jwt.verify(token,config.SECRET)
    if(!token || ! decodedToken.id){
      return response.status(400).json({ error:'token missing or invalid' })
    }


    const user = await User.findById(decodedToken.id)

    const note = new Note({
      content: body.content,
      date: new Date(),
      important: body.important || false,
      user: user._id
    })
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.json(savedNote)
  }catch(exception){
    next(exception)
  }
})
module.exports = notesRouter