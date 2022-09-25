const booksRouter = require('express').Router()
const Books = require('../models/book')
booksRouter.get('/', (resquest, response, next) => {
  Books.find({})
    .then((res) => {
      response.send(res)
    })
    .catch((e) => next(e))
})

booksRouter.get('/info', (resquest, response, next) => {
  Books.find({})
    .then((res) => {
      response.send(
        `<p>PhoneBook has info for ${res.length}</p><p>${new Date()}</p>`
      )
    })
    .catch((e) => next(e))
})
booksRouter.get('/:id', (resquest, response, next) => {
  const id = resquest.params.id
  Books.findById(id)
    .then((res) => response.send(res))
    .catch((e) => next(e))
})

booksRouter.delete('/:id', (resquest, response, next) => {
  const id = resquest.params.id
  Books.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch((e) => next(e))
})

booksRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id
  if (body) {
    const book = {
      number: body.number,
    }

    Books.findByIdAndUpdate(id, book, { new: true, runValidators: true })
      .then((updateBook) => {
        console.log('book saved')
        response.send(updateBook)
      })
      .catch((e) => next(e))
  } else {
    response.sendStatus(404).end()
  }
})

booksRouter.post('/', (request, response, next) => {
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

module.exports = booksRouter