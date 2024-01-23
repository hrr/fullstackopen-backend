const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    content: body.content,
    important: body.important || false,
    title: body.title,
    url: body.url,
    author: body.author,
    user: request.user.id
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (request.user.id.toString() !== blog.user.toString())
    return response.status(401).json({ error: 'not your blog' })


  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(savedBlog)
})

module.exports = blogsRouter