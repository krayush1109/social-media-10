require('dotenv').config({ path: './.env' });

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.routes');
var userRouter = require('./routes/user.routes');
var updateRouter = require('./routes/update.routes');
var postRouter = require('./routes/post.routes');

// 🔷🔷🔷🔷🔷🔷🔷 Authentication Setup 🔷🔷🔷🔷🔷🔷🔷
const session = require('express-session');
const flash = require('connect-flash'); // Import connect-flash
const passport = require('./config/passport-config'); // Passport.js configuration
const authRouter = require('./routes/auth.route'); // Routes related to authentication

// Establish MongoDB connection and load user schema
require('./config/db-connection').connectDB();
require('./models/user.schema');
// 🔷🔷🔷🔷🔷🔷🔷 Authentication Setup End 🔷🔷🔷🔷🔷🔷🔷

// express-fileupload to be used with imagekit
var fileUpload = require('express-fileupload')

var app = express();
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// config: express-fileupload to be used with imagekit
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 🔶🔶🔶🔶🔶🔶🔶  Session and Passport Setup 🔶🔶🔶🔶🔶🔶🔶
// Initialize session middleware for persistent login sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', // Replace with your secret
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize connect-flash
app.use(flash());

// Initialize Passport.js and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// Use authentication routes
app.use('/user', authRouter);
// 🔶🔶🔶🔶🔶🔶🔶 Session and Passport Setup End 🔶🔶🔶🔶🔶🔶🔶

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/update', updateRouter);
app.use('/post', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
