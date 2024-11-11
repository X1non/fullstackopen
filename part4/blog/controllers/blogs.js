const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate('user', ['id', 'username', 'name'])
    .catch(error => next(error))

  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id // no need whole user object, just user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id) // also this, only its _id needed
    await user.save()
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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const user = request.user

  const blogToDelete = await Blog.findById(request.params.id)
  if (!blogToDelete) {
    return response.status(400).json({ error: 'blog not found'})
  } else if (blogToDelete.user._id.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'delete is not allowed as you are not the creator' })
  } 
  await blogToDelete.deleteOne().catch(error => next(error))
  
  user.blogs = user.blogs.filter(blog => blog._id.toString() !== request.params.id)
  await user.save()
  response.sendStatus(204).end()

})

module.exports = blogsRouter