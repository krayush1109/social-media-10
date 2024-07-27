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

// express-fileupload to be used with imagekit
var fileUpload = require('express-fileupload')

var app = express();
  
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// db connection
const db = require('./models/db')
db.connectDB();

// model or schema collection
const UserCollection = require('./models/user.schema');

// ------------- passport & session config -------------
const session = require('express-session');
const passport = require('passport');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(UserCollection.serializeUser());
passport.deserializeUser(UserCollection.deserializeUser());

// ------------- passport & session config -------------

// config: express-fileupload to be used with imagekit
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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
