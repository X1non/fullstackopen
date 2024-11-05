const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  return response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  const newUser = new User({
    username: body.username,
    name: body.name,
    password: await bcrypt.hash(body.password, 10)
  })

  const savedUser = await newUser.save().catch(error => next(error))

  return response.status(201).json(savedUser)
})

module.exports = usersRouter
