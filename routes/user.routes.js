var express = require('express');
var router = express.Router();

const UserCollection = require('../models/user.schema');
// middleware
const { isLoggedIn } = require('../middleware/auth');

// ------------ passport routes ------------ 
const passport = require('passport')
const LocalStrategy = require('passport-local')
passport.use(new LocalStrategy(UserCollection.authenticate()))
// ------------ passport routes ------------ 

// controllers
const { getChatPage, renderResetPasswordPage, handleAvatarUpload, deleteUserAndAvatar, handleSendMail, renderHomeFeed, handleRegistration, renderUserProfile, handleOrderCreation, logoutUser, handleOTPVerification, handleResetPassword, renderOTPVerificatonPage, renderSettingPage } = require('../controllers/user.controller');

/* GET users listing. */

router.post('/register', handleRegistration)

router.post('/login',
  passport.authenticate("local", {
    successRedirect: "/user/homeFeeds",
    failureRedirect: "/login",
  }),
  (req, res, next) => { });

router.get('/homeFeeds', isLoggedIn, renderHomeFeed)

router.get('/logout', isLoggedIn, logoutUser)

router.post('/send-mail', handleSendMail)

router.get('/verify-otp/:id', renderOTPVerificatonPage)

router.post('/verify-otp/:id', handleOTPVerification)

router.get('/reset_pwd/:id', renderResetPasswordPage)

router.post('/reset_pwd/:id', handleResetPassword)

router.get('/setting', isLoggedIn, renderSettingPage)

router.post('/avatar/:id', isLoggedIn, handleAvatarUpload)

router.get('/delete/:id', isLoggedIn, deleteUserAndAvatar)

router.get('/profile', isLoggedIn, renderUserProfile)

router.post('/createOrder', isLoggedIn, handleOrderCreation)


module.exports = router;
