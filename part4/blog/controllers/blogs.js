const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).catch(error => next(error))

  return response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  // console.log("BODY!", body)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  try {
    const savedBlog = await blog.save()
    // console.log('response', savedBlog)
    return response.status(201).json(savedBlog)
  } catch (e) {
    // console.log('erooor', e)
    return next(e)
  }

})

module.exports = blogsRouter