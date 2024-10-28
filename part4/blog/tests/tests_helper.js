const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, nonExistingBlogId, blogsInDb
}