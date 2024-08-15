const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.schema');

const loginFieldName = "email" || "username";

// Configure Passport.js to use the LocalStrategy
passport.use(new LocalStrategy(
    { usernameField: loginFieldName }, // Field used for login
    async (loginFieldName, password, done) => {
        try {
            console.log("Testing -> 1");

            // Find user by loginFieldName
            const user = await User.findOne({
                $or: [
                    { username: loginFieldName },
                    { email: loginFieldName }
                ]
            });
            console.log("user: ", user);

            if (!user) {
                console.log("Testing -> 2");
                return done(null, false, { message: 'No user with that username' });
            }

            // Passport-local-mongoose handles password comparison
            user.authenticate(password, (err, user, msg) => {
                if (err) return done(err);
                if (!user) return done(null, false, { message: msg });
                return done(null, user);
            });
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user into session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


module.exports = passport;
