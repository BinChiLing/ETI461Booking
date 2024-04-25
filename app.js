const dotenv = require('dotenv');

dotenv.config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();


app.get('/', async function(req,res){
  res.send("hello first request")
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// users route
var usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// auth route
var authRoute = require("./routes/auth.js");
app.use('/auth', authRoute);

// hotels route
var hotelRoute = require("./routes/hotels.js");
app.use('/hotels', hotelRoute);

// hotel rooms route
var roomsRoute = require("./routes/hotelrooms.js");
app.use('/hotelrooms', roomsRoute); 


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
