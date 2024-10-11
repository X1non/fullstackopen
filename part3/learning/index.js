const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const Note = require('./models/note')

// Middleware are functions that can be used for handling request and response objects.
// express.json() is a middleware for retrieving data sent through request
// which is assigned into request object: request.body
app.use(express.json())

// middleware for allowing request from another/different origin
// in this case, backend and frontend use different ports
app.use(cors())

// middleware for express showing static content
app.use(express.static(path.join(__dirname, 'dist')))

// middleware for logging request
const requestLogger = (request, response, next) => {
  console.log('Incoming request for', request.originalUrl)
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// middleware for directing user into unknown request endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)