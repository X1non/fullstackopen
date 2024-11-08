const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate('user', ['id', 'username', 'name'])
    .catch(error => next(error))

  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  // console.log("BODY!", body)

  const userCount = await User.countDocuments()
  const randomIndex = Math.floor(Math.random() * userCount)
  const randomUser = await User.findOne().skip(randomIndex)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: randomUser
  })

  try {
    const savedBlog = await blog.save()
    randomUser.blogs.push(savedBlog)
    randomUser.save()
    response.status(201).json(savedBlog)
  } catch (e) {
    return next(e)
  }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,
    blog,
    { new: true, runValidators: true, context: 'query' }
  ).catch(error => next(error))

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id).catch(error => next(error))
  response.sendStatus(204).end()

})

module.exports = blogsRouter