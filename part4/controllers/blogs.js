const blogsRoutes = require('express').Router()
const Blog = require('../models/blog')
const UserModels = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRoutes.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { user: 1, name: 1 })
    return response.json(blogs)
  } catch (e) {
    next(e)
  }
})

blogsRoutes.post('/:id/comments', async (request, response, next) => {
  const comment = request.body.comment
  const id = request.params.id
  let blog = await Blog.findById(id)
  blog.comments = [...blog.comments, comment]
  Blog.findByIdAndUpdate(id, { ...blog }, { new: true })
    .then((upd) => {
      response.send(upd)
    })
    .catch((e) => next(e))
})
blogsRoutes.post('/', async (request, response, next) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, config.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(400).json({
        error: 'token missing or invalid',
      })
    }
    const body = request.body
    console.log(decodedToken.id)
    const user = await UserModels.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    })
    const saveBlog = await blog.save()
    user.blogs = user.blogs.concat(saveBlog.id)
    await user.save()
    response.status(201).json(saveBlog)
  } catch (e) {
    next(e)
  }
})

blogsRoutes.put('/:id', async (request, response, next) => {
  const body = request.body
  const id = request.params.id
  const blog = await Blog.findById(id)
  const token = request.token

  const decodedToken = jwt.verify(token, config.SECRET)
  const idUser = decodedToken.id.toString()
  if (blog.user.toString() == idUser) {
    Blog.findByIdAndUpdate(id, { ...body, user: idUser }, { new: true })
      .then((upd) => {
        response.send(upd)
      })
      .catch((e) => next(e))
  } else {
    return response.status(401).send({ error: 'dont have permission' })
  }
})
blogsRoutes.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id

    const blog = await Blog.findById(id)

    const token = request.token
    const decodedToken = jwt.verify(token, config.SECRET)

    if (blog.user.toString() == decodedToken.id.toString()) {
      await Blog.deleteOne({ _id: blog._id })
      response.status(204).end()
    } else {
      return response.status(401).send({ error: 'dont have permission' })
    }
  } catch (e) {
    next(e)
  }
})

module.exports = blogsRoutes
