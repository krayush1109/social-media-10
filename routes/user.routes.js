var express = require('express');
var router = express.Router();

// middleware
const { isLoggedIn } = require('../middleware/auth');

// ------------ passport routes ------------ 
const passport = require('passport')
const LocalStrategy = require('passport-local')
const UserCollection = require('../models/user.schema')

passport.use(new LocalStrategy(UserCollection.authenticate()))
// ------------ passport routes ------------ 

/* GET users listing. */

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const encryptedDetail = password;

    await UserCollection.register({ username, email }, encryptedDetail);
    res.redirect("/login");
  } catch (err) {
    console.error("Error: ", err);
    res.send("Error: ", err.message);
  }
})

router.post('/login',
  passport.authenticate("local", {
    successRedirect: "/user/profile",
    failureRedirect: "/login",
  }),
  (req, res, next) => { });

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render("profile", { title: "Profile | Socialmedia", user:  req.user })
})

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logOut(() => {
    res.redirect('/login')
  })
})

module.exports = router;
