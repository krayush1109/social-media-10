var express = require('express');
var router = express.Router();

const path = require('path')

const UserCollection = require('../models/user.schema');
// middleware
const { isLoggedIn } = require('../middleware/auth');

// ------------ passport routes ------------ 
const passport = require('passport')
const LocalStrategy = require('passport-local')
passport.use(new LocalStrategy(UserCollection.authenticate()))
// ------------ passport routes ------------ 

const { sendMail } = require('../utils/sendMail');
const imagekit = require('../utils/imagekit');
const PostCollection = require('../models/post.schema');

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
    successRedirect: "/user/home",
    failureRedirect: "/login",
  }),
  (req, res, next) => { });

router.get('/home', isLoggedIn, async (req, res, next) => {
  const posts = await PostCollection.find({ user: {$ne: req.user._id} }).populate("user");


  res.render("homeFeeds", { title: "Home | Socialmedia", user: req.user, posts });
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
    const user = await UserCollection.findById(req.params.id);
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
    const user = await UserCollection.findById(req.params.id);
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

router.get('/setting', isLoggedIn, (req, res, next) => {
  res.render("setting", { title: "Setting", user: req.user });
})

router.post('/avatar/:id', isLoggedIn, async (req, res, next) => {
  const user = await UserCollection.findById(req.params.id);

  // Upload the new avatar
  try {
    const { fileId, url, thumbnailUrl } = await imagekit.upload({
      file: req.files.avatar.data,
      // fileName: Date.now() + path.extname(req.files.avatar.name),
      fileName: user.username,
      folder: "/avatar",
    })

    // console.log("req.user : ", req.user);
    // console.log("req.user.avatar : ", req.user.avatar);
    // console.log("req.user.avatar.fileId: ", fileId);

    // Delete the old avatar if it exists
    if (req.user.avatar && req.user.avatar.fileId) {
      await imagekit.deleteFile(req.user.avatar.fileId);
    }

    // Update the user's new avatar info
    user.avatar = { fileId, url, thumbnailUrl };
    await user.save();

    // Redirect to the settings page
    res.redirect("/user/profile");
  } catch (err) {
    console.error(err.message);
    res.send(err);
  }

})

// 🗑️ DELETE USER 🗑️
router.get('/delete/:id', isLoggedIn, async (req, res, next) => {
  const user = await UserCollection.findByIdAndDelete(req.params.id);
  console.log(user);
  await imagekit.deleteFile(user.avatar.fileId);
  // await user.save();

  res.redirect('/register');
})

router.get('/profile', isLoggedIn, async (req, res, next) => {
  await req.user.populate("posts");
  // res.json(req.user);
  res.render('profile', { title: "User's Profile Page", user: req.user });
})

router.get('/chat', isLoggedIn, async (req, res, next) => {
  res.render('chat', { title: "User's Message Page", user: req.user });
})

module.exports = router;
