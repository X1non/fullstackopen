const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordMatch = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)

  if (!user || !passwordMatch) {
    return response.status(401).json({ error: 'wrong username or password' })
  }

  // payload/data/token
  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter