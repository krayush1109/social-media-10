var express = require('express');
var router = express.Router();

// db schema
const UserCollection = require('../models/user.schema');

// middleware
const { isLoggedIn } = require('../middleware/auth');

// ------------ passport routes ------------ 
const passport = require('passport')
const LocalStrategy = require('passport-local')
passport.use(new LocalStrategy(UserCollection.authenticate()))
// ------------ passport routes ------------ 

router.post('/bio/:id', isLoggedIn, async (req, res, next) => {
    console.log(req.body);

    try {
        const user = await UserCollection.findById(req.params.id);

        const { bio } = req.body;
        user.bio = bio;
        await user.save();
    } catch (err) {
        console.log(err.message);
        res.send(err, `<br /><a href="/user/setting">Setting Page</a>`)
    }

    res.redirect('/user/profile');
})

router.post('/username/:id', isLoggedIn, async (req, res, next) => {
    try {
        const { newUsername } = req.body;
        const user = await UserCollection.findById(req.params.id);
        
        user.username = newUsername;
        await user.save();

        res.redirect("/user/setting");;
    } catch (error) {
        console.log(error.message);
        res.send(error);
    }
        
})

router.post('/updatePassword/:id', isLoggedIn, async (req, res, next) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    try {
        const user = await UserCollection.findById(req.params.id);            

        user.authenticate(currentPassword, async (err, user, passwordErr) => {
            if (err)
                return next(err);

            if (passwordErr)
                return res.status(400).send("Current password is incorrect");

            if (newPassword !== confirmPassword)
                return res.status(400).send("New passwords do not match");

            await user.changePassword(currentPassword, newPassword)
            res.send("password Updated - Successfully!");
            
        })        


    } catch (err) {
        console.log(err.message);
        res.send(err);
    }
})

module.exports = router;