const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
  blogs: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Blog' 
  }]
})

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.password
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User