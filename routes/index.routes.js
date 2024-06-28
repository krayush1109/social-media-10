var express = require('express');
const { sendMail } = require('../utils/sendMail');
const UserCollection = require('../models/user.schema');
const { use } = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home | Socialmedia', user: req.user
  });
});

router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'About | Socialmedia', user: req.user
  });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', {
    title: 'Contact | Socialmedia', user: req.user
  });
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Login | Socialmedia', user: req.user
  });
});

router.get('/register', function (req, res, next) {
  res.render('register', {
    title: 'Register | Socialmedia', user: req.user
  });
});

router.get('/forgot', function (req, res, next) {
  res.render("forgot", { title: 'Forgot Password', user: req.user })
})

router.get('/verify-otp/:id', async (req, res, next) => {
  const user = await UserCollection.findById(req.params.id);
  if (!user)
    return res.send(`Warning! Don't Try to manipulate the URL. You will be Blocked Permanently. `);
  
  console.log(user)
  
  res.render('verify_otp', { title: "Verify Password", user: user});
})



module.exports = router;
