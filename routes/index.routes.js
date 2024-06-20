var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home | Social Media' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About | Social Media' });
});

router.get('/contact', function (req, res, next) {
  res.render('contact', { title: 'Contact | Social Media' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login | Social Media' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register | Social Media' });
});

module.exports = router;
