var express = require('express');
var router = express.Router();

// middleware
const { isLoggedIn } = require('../middleware/auth');

// ------------ passport routes ------------ 
const passport = require('passport')
const LocalStrategy = require('passport-local')
const UserCollection = require('../models/user.schema');
const { sendMail } = require('../utils/sendMail');
const User_Collection = require('../models/user.schema');

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
  res.render("profile", { title: "Profile | Socialmedia", user: req.user })
})

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logOut(() => {
    res.redirect('/login')
  })
})

router.post('/send-mail', async (req, res, next) => {
  try {
    const user = await UserCollection.findOne({ email: req.body.email })
    console.log("Email: ", req.body.email);
    console.log("USER: ", user);

    if (!user)
      return res.send(`No User Found with the Email: ${req.body.email}. <a href="/forgot">Try Again</a> `)

    await sendMail(req, res, user);
  } catch (err) {
    console.error("Error: ", err);
    res.send(err.message);
  }
})

router.post('/verify-otp/:id', async (req, res, next) => {
  const { otp_inp } = req.body;
  try {
    const user = await User_Collection.findById(req.params.id);
    if (!user)
      return res.send(`No User Found with the Email: ${req.body.email}. <a href="/forgot">Try Again</a>`);

    if (otp_inp != user.otp || otp_inp == 0) {
      user.otp = 0;
      await user.save();
      return res.send(`Invalid OTP. <a href="/forgot">Try Again</a>`);
    }
    else {

      return res.redirect(`/user/reset_pwd/${req.params.id}`);
    }
  } catch (err) {
    console.error(err.message);
    res.send(err);
  }
})

router.get('/reset_pwd/:id', async (req, res, next) => {
  try {
    const user = await UserCollection.findById(req.params.id);
    user.otp = 0;
    await user.save();
    return res.render("reset_pwd", { title: "Reset password", user: user });
  } catch (err) {
    console.error(err.message);
    res.send(err);
  }
})

router.post('/reset_pwd/:id', async (req, res, next) => {
  console.log("RESET password - POST ROUTE")
  const { password, cpassword } = req.body;

  try {
    const user = await User_Collection.findById(req.params.id);
    if (!user)
      return res.send(`No User Found with the Email: ${req.body.email}`);

    if (password != cpassword) {
      return res.send(`<h1 style="color:red; text-align: center; margin-top:200px; font-family: sans-serif;>Password and Confirm Password does not match. <a href="/reset_pwd/${req.params.id}">Try Again <a/> </h1>`)
    }
    else {
      await user.setPassword(password);
      await user.save();
      return res.redirect('/login');
    }
  } catch (err) {
    console.error(err.message);
    res.render(err);
  }
})



module.exports = router;
