var path = require('path');
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var connectDB = require('./connectDB.js');

/**  Let first connect to dB ***/

(async () => {
  await connectDB();
  console.log('Here - Await is over');
})();

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  if (req.app.get('env') === 'development') {
    res.locals.error = err;
  } else {
    res.locals.error = {};
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
