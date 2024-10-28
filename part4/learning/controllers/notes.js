const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  return response.json(notes)
})

notesRouter.get('/:id', async (request, response, next) => {
  const note = await Note.findById(request.params.id).catch(error => next(error))
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save().catch(error => next(error))
  response.status(201).json(savedNote)
})

notesRouter.put('/:id', async (request, response, next) => {
  const { content, important } = request.body

  const updatedNote = await Note.findByIdAndUpdate(request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' })
    .catch(error => next(error))

  return response.json(updatedNote)
})

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

module.exports = notesRouter