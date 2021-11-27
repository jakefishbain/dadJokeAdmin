const AdminBro = require('admin-bro')
const { User } = require('./user.entity')

const {after, before } = require('./actions/password.hook')

const options = {
  properties: {
    encryptedPassword: {
      isVisible: false
    },
    password: {
      type: 'password'
    }
  },
  actions: {
    new: {
      after,
      before
    },
    edit : {
      after,
      before
    }
  }
}

module.exports = {
  options,
  resource: User
}