var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var bcrypt = require('bcryptjs');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var rolesRouter = require('./routes/roles');

var expressValidator = require('express-validator');
var flash = require('connect-flash');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/demo_nodejs');

var fs = require('fs');

/*
 * initializes all models and sources them as .model-name
 */
fs.readdirSync('./models/').forEach(function(file) {
	if (file !== 'index.js') {
	    var moduleName = file.split('.')[0];1
	    exports[moduleName] = require('./models/' + moduleName);
	}
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator());

app.use(session({
    secret: 'jindo',
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/admin/product', productsRouter);
app.use('/admin/role', rolesRouter);

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
  res.render('shared/error');
});

module.exports = app;
