const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./tests_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('with initial users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    for (let note of helper.initialUsers) {
      let userObject = new User(note)
      await userObject.save()
    }
  })

  describe('creating user', () => {
    test('succeed when providing required data', async () => {
      const newUser = {
        username: 'test',
        name: 'test',
        password: 'test'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const savedUsers = await helper.usersInDb()
      assert.strictEqual(savedUsers.length, helper.initialUsers.length + 1)

      const usernames = savedUsers.map(user => user.username)
      assert(usernames.includes('test'))
    })

    test('failed when required data did not provided', async () => {
      const newUser = {
        username: 'failNoPassword',
        name: 'fail',
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert(response.error.text.includes('password not provided'))

      const savedUsers = await helper.usersInDb()
      assert.strictEqual(savedUsers.length, helper.initialUsers.length)

      const usernames = savedUsers.map(user => user.username)
      assert(!usernames.includes('failNoPassword'))
    })

    test('failed when provided password characters less than required', async () => {
      const newUser = {
        username: 'failInvalidPassword',
        name: 'fail',
        password: 'f'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.error, 'password length must be at least 3 characters')

      const savedUsers = await helper.usersInDb()
      assert.strictEqual(savedUsers.length, helper.initialUsers.length)

      const usernames = savedUsers.map(user => user.username)
      assert(!usernames.includes('failInvalidPassword'))
    })

    test('failed when `username` already existed', async () => {
      const newUser = {
        username: 'username',
        name: 'name',
        password: 'password'
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.error, 'expected `username` to be unique')

      const savedUsers = await helper.usersInDb()
      assert.strictEqual(savedUsers.length, helper.initialUsers.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})