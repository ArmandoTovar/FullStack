const mongoose = require('mongoose')

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  favoriteGenre: { type: String, required: true },
})

module.exports = mongoose.model('user', user)
