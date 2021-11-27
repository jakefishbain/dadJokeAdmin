const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  encryptedPassword: {
    type: String,
    required: false
  }
})

const User = mongoose.model('User', UserSchema);

module.exports = { UserSchema, User };