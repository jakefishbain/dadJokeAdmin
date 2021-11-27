const argon2 = require('argon2')
const AdminBro = require('admin-bro')

const after = async (response) => {
  if (response.record && response.record.errors) {
    response.record.errors.password = response.record.errors.encryptedPassword
  }
}

const before = async (request) => {
  if(request.method === 'post') {
    const { password, ...otherParams } = request.payload

    if (password) {
      const encryptedPassword = await argon2.hash(password);

      return {
        ...request,
        payload: {
          ...otherParams,
          encryptedPassword
        }
      }
    }
  } 
  return request
}

module.exports = { after, before }