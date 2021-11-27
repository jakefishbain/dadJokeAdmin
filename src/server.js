
require('dotenv').config();

const express = require('express')
const AdminBro = require('admin-bro')
const mongoose = require('mongoose');

const options = require('./admin.options')
const buildAdminRouter = require('./admin.router')

const app = express()
const port = process.env.PORT || 3000

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);
  app.use(admin.options.rootPath, router)

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

module.exports = run;