const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Hello, World!',
    author: 'Hello',
    url : 'example.com'
  },
  {
    title: 'Node.js is Fun!',
    author: 'Noir'
  }
]

const initialUsers = [
  {
    username: 'moriwaka',
    name: 'Moriwaka Satou',
    password: 'mowasan'
  },
  {
    username: 'username',
    name: 'name',
    password: 'password'
  }
]

const nonExistingBlogId = async () => {
  const blog = new Blog({ title: 'placeholder' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON()) 
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, nonExistingBlogId, 
  blogsInDb, usersInDb
}