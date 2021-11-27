const AdminBro = require('admin-bro')
const AdminBroMongoose = require('admin-bro-mongoose')

AdminBro.registerAdapter(AdminBroMongoose);

const AdminUser = require('./users/user.admin');

const options = {
  resources: [ AdminUser ]
};

module.exports = options;