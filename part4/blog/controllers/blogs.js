const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getToken = (token) => {
  if (token && token.startsWith('Bearer ')) {
    return token.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
    .populate('user', ['id', 'username', 'name'])
    .catch(error => next(error))

  // const userToken = getToken(request.headers.authorization)

  // const decodedToken = jwt.verify(userToken, process.env.SECRET)
  // console.log(decodedToken)

  // const user = await User.findById(decodedToken.id)
  // console.log(user)

  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const userToken = getToken(request.headers.authorization)
  const decodedToken = jwt.verify(userToken, process.env.SECRET)

  // We should handle token verification on jwt.verify return value.
  // Then we need to specify id because jwt.verify could still return
  // other values
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id // no need whole user object, just user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id) // also this, only its _id needed
  await user.save()
  
  response.status(201).json(savedBlog)
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