const UserCollection = require("../models/user.schema");
const PostCollection = require('../models/post.schema');
const imagekit = require('../utils/imagekit');

const path = require('path')

// Payment Integration with Razorpay
const Razorpay = require('razorpay');
var instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET',
});

const { sendPasswordResetMail } = require('../utils/sendPasswordResetMail');

exports.handleRegistration = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const encryptedDetail = password;

        await UserCollection.register({ username, email }, encryptedDetail);
        res.redirect("/login");
    } catch (err) {
        console.error("Error: ", err);
        res.send("Error: ", err.message);
    }
}

exports.renderHomeFeed = async (req, res, next) => {
    const posts = await PostCollection.find({ user: { $ne: req.user._id } }).populate("user");

    res.render("homeFeeds", { title: "Home | Socialmedia", user: req.user, posts });
}

exports.logoutUser = (req, res, next) => {
    req.logOut(() => {
        res.redirect('/login')
    })
}

exports.handleSendMail = async (req, res, next) => {
    try {
        const user = await UserCollection.findOne({ email: req.body.email })
        console.log("Email: ", req.body.email);
        console.log("USER: ", user);

        if (!user)
            return res.send(`No User Found with the Email: ${req.body.email}. <a href="/forgot">Try Again</a> `)

        await sendPasswordResetMail(req, res, user);
    } catch (err) {
        console.error("Error: ", err);
        res.send(err.message);
    }
}

exports.renderOTPVerificatonPage = async (req, res, next) => {
    const user = await UserCollection.findById(req.params.id);
    if (!user)
        return res.send(`Warning! Don't Try to manipulate the URL. You will be Blocked Permanently. `);

    console.log(user)

    res.render('verify_otp', { title: "Verify Password", user: user });
}

exports.handleOTPVerification = async (req, res, next) => {
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
}

exports.renderResetPasswordPage = async (req, res, next) => {
    try {
        const user = await UserCollection.findById(req.params.id);
        user.otp = 0;
        await user.save();
        return res.render("reset_pwd", { title: "Reset password", user: user });
    } catch (err) {
        console.error(err.message);
        res.send(err);
    }
}

exports.handleResetPassword = async (req, res, next) => {
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
}

exports.renderSettingPage = (req, res, next) => {
    res.render("setting", { title: "Setting", user: req.user });
}

exports.handleAvatarUpload = async (req, res, next) => {
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

}

exports.deleteUserAndAvatar = async (req, res, next) => {
    const user = await UserCollection.findByIdAndDelete(req.params.id);
    console.log(user);
    await imagekit.deleteFile(user.avatar.fileId);
    // await user.save();

    res.redirect('/register');
}

exports.renderUserProfile = async (req, res, next) => {
    await req.user.populate("posts");
    // res.json(req.user);
    res.render('profile', { title: "User's Profile Page", user: req.user });
}

exports.handleOrderCreation = async (req, res, next) => {
    var options = {
        amount: 500 * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
        console.log(order);
    });
}

// suggest name of below function ?
exports.getChatPage = async (req, res, next) => {
    try {
        let allUsers = await UserCollection.find({ _id: { $ne: req.user._id } })
        console.log(req.user);
        console.log(allUsers);
        res.render('chat', { title: "User's Message Page", user: req.user, allUsers });
    } catch (error) {
        console.log(error.message);
        res.send(error);
    }
}
