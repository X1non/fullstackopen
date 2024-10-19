const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  }).catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: String,
  likes: {
    type: Number,
    min: 0
  }
})

blogSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)