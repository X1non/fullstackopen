const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: { 
    type: String,
    default: 'Anonymous'
  },
  url: { 
    type: String,
    required: true
  },
  likes: {
    type: Number,
    min: 0,
    default: 0
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