const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./tests_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('with initial blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    // Why this apporach can't?
    // const blogObjects = helper.initialBlogs
    // blogObjects.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })
  
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })
  
  test('there is unique identifier of each blog', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.map((blog) => {
      assert(Object.hasOwn(blog, 'id'))
    })
  })

  describe('create blog', () => {
    test('new blog successfully saved into database', async () => {
      const newBlog = {
        title: 'This is a new blog',
        author: 'Newcomer',
        url: 'new-blog.com',
        likes: 10
      }
    
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const savedBlogs = await helper.blogsInDb()
      assert.strictEqual(savedBlogs.length, helper.initialBlogs.length + 1)
    
      const titles = savedBlogs.map(blog => blog.title)
      assert(titles.includes('This is a new blog'))
    })
    
    test('new blog automatically includes like property that defaults to 0', async () => {
      const newBlog = {
        title: 'This is a new blog',
        author: 'Newcomer',
        url: 'new-blog.com',
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const savedBlogs = await helper.blogsInDb()
      const recentlySaved = savedBlogs.find(blog => blog.title === 'This is a new blog')
      assert.strictEqual(recentlySaved.likes, 0)
    })
    
    test('new blog without required properties will not be saved', async () => {
      const newBlog2 = {
        author: 'Newbie',
        url: 'new-blog.com'
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)
    
      const savedBlogs = await helper.blogsInDb()
      assert.equal(savedBlogs.length, helper.initialBlogs.length)
    })
  })
  
  test('update blog', async () => {
    const blogsBefore = await helper.blogsInDb()
    const oldBlog = blogsBefore.find(blog => blog.title === "Hello, World!")
  
    const updatedBlog = {
      likes: 1
    }
  
    await api
      .put(`/api/blogs/${oldBlog.id}`)
      .send(updatedBlog)
      .expect(200)
  
    const blogsAfter = await helper.blogsInDb()
    const newBlog = blogsAfter.find(blog => blog.title === "Hello, World!")
    
    assert.equal(newBlog.likes, oldBlog.likes + 1)
  })
  
  test('delete blog', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToDelete = blogsBefore[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAfter = await helper.blogsInDb()
    const titles = blogsAfter.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))
  })

})

after(async () => {
  await mongoose.connection.close()
})