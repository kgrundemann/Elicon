const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('layout');
});

app.post('/', (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'krzgrund@gmail.com',
      pass: 'uqpzywuzhmohvdcy',
    },
  });

  const mail_option = {
    from: req.body.email,
    to: 'krzgrund@gmail.com',
    subject: `Message from ${req.body.name}: ${req.body.subject}`,
    text: req.body.message,
  };

  transporter.sendMail(mail_option, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email: ' + error.message);
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
