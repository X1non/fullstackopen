const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})

  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (!body.password) {
    return response.status(400).json({ error: 'password not provided' })
  } else if (body.password.length < 3) {
    return response.status(400).json({ error: 'password length must be at least 3 characters' })
  }

  const newUser = new User({
    username: body.username,
    name: body.name,
    password: await bcrypt.hash(body.password, 10)
  })

  try {
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (e) {
    return next(e)
  }
  
})

module.exports = usersRouter
