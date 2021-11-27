
require('dotenv').config();

const express = require('express')
const AdminBro = require('admin-bro')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const fetch = require('node-fetch')


const options = require('./admin.options')
const buildAdminRouter = require('./admin.router')

const { User } = require('./users/user.entity');

const app = express()
const port = process.env.PORT || 3000

const run = async () => {
  // 
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2npsl.mongodb.net/dadJokeAdmin?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);
  app.use(admin.options.rootPath, router)

  const recipients = await getRecipients();
  console.log('recipients', recipients)
  // sendIt(recipients.join(','));

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}


const getRecipients = async () => {
  try {
    const results = await User.find({});
    // console.log('users...', results)
    return results.map(u => u.email);
  } catch (err) {
    throw err;
  }
}

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
  },
});

const sendIt = async (recipients) => {

  const mailOptions = {
    from: 'jake@jakefishbain.com',
    bcc: recipients,
    subject: 'Dad Joke of the Day 👴🏼'
  };

  var requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json'},
    redirect: 'follow'
  };

  await fetch("https://icanhazdadjoke.com/", requestOptions)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    return result.joke
  })
  .then(joke => {
    console.log('JOKE: ', joke)
    transporter.sendMail({text: joke + '\n\n🐟', ...mailOptions}, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
  .catch(error => console.log('error', error));
}

module.exports = run;