// const isLoggedIn = (req, res, next) => {
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");        
    }
}

// module.exports = isLoggedIn; // isko dusre page mein fetch krne ke liye - destructuring krne ki jarrort nhi hai