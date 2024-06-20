var express = require('express');
var router = express.Router();

// ------------ passport routes ------------ 
const passport = require('passport')
const LocalStrategy = require('passport-local')
const UserCollection = require('../models/user.schema')

passport.use(new LocalStrategy(UserCollection.authenticate()))
// ------------ passport routes ------------ 

/* GET users listing. */
router.get('/', (req, res, next) => {
  // res.send('respond with a resource ');
  res.redirect('/')
})

router.post('/register', async (req, res, next) => {
  try {
    res.json(req.body)
  } catch (err) {
    console.error("Error: ", err);
    res.send("Error: ", err.message);
  }
})

module.exports = router;
