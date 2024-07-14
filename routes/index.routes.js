var express = require('express');
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

module.exports = router;