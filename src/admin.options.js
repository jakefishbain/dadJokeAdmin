const AdminBro = require('admin-bro')
const AdminBroMongoose = require('admin-bro-mongoose')

AdminBro.registerAdapter(AdminBroMongoose);

const { User } = require('./users/user.entity');

const options = {
  resources: [ User ]
};

module.exports = options;