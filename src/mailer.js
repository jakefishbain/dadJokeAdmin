require('dotenv').config();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const fetch = require('node-fetch')

const { User } = require('./users/user.entity');

const getRecipients = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  try {
    console.log('getting recipients')
    const results = await User.find({});
    console.log('users...', results)
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

const sendIt = async () => {
  const recipients = await getRecipients();

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
        return info.response
      }
    });
    transporter.close();
  })
  .catch(error => console.log('error', error));
}

sendIt();