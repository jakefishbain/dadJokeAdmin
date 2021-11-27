

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
  await getRecipients();

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

module.exports = getRecipients;
// sendIt();