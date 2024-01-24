const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Define your routes
app.get('/', (req, res) => {
  res.render('layout');
});

app.post(
  '/send',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid Email Address'),
    check('subject').notEmpty().withMessage('Subject is required'),
    check('message').notEmpty().withMessage('Message is required'),
  ],
  (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.render('layout', { errors: errors.mapped() });
    } else {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'krzgrund@gmail.com',
          pass: 'uqpzywuzhmohvdcy',
        },
      });

      const mail_option = {
        from: request.body.email,
        to: 'krzgrund@gmail.com',
        subject: request.body.subject,
        text: request.body.message,
      };

      transporter.sendMail(mail_option, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          response.redirect('/layout');
        }
      });
    }
  }
);

app.get('/layout', (request, response) => {});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
