
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Books = require('./models/book')

morgan.token('tname', function getName(req) {
  return JSON.stringify({ ...req.body })
})
const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(' :method :url :response-time :tname'))
app.get('/api/persons', (resquest, response, next) => {
  Books.find({})
    .then((res) => {
      response.send(res)
    })
    .catch((e) => next(e))
})

app.get('/info', (resquest, response, next) => {
  Books.find({})
    .then((res) => {
      response.send(
        `<p>PhoneBook has info for ${res.length}</p><p>${new Date()}</p>`
      )
    })
    .catch((e) => next(e))
})
app.get('/api/persons/:id', (resquest, response, next) => {
  const id = resquest.params.id
  Books.findById(id)
    .then((res) => response.send(res))
    .catch((e) => next(e))
})

app.delete('/api/persons/:id', (resquest, response, next) => {
  const id = resquest.params.id
  Books.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch((e) => next(e))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id
  if (body) {
    const book = {
      number: body.number,
    }

    Books.findByIdAndUpdate(id, book, { new: true,runValidators:true })
      .then((updateBook) => {
        console.log('book saved')
        response.send(updateBook)
      })
      .catch((e) => next(e))
  } else {
    response.sendStatus(404).end()
  }
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (body) {
    const Book = new Books({
      name: body.name,
      number: body.number,
      date: new Date(),
    })
    Book.save()
      .then((saveBook) => {
        console.log('book saved')
        response.send(saveBook)
      })
      .catch((e) => next(e))
  } else {
    response.sendStatus(404).end()
  }
})
const PORT = process.env.PORT || 3001

const HandleErrorMiddleware = (error, request, response, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id no found' })
  }else if(error.name==='ValidationError'){
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(HandleErrorMiddleware)

app.listen(PORT, () => console.log('App running'))
