var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get our mongoose model

mongoose.connect(config.database); // connect to database


//var routes = require('./routes/router');

var swig = require('swig');

var app = express();

app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('superSecret', config.secret);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
//app.use('/', routes);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.get('/', function(req, res) {
  var user;
  console.log(req.session.user);
  if(req.session.user) {
    console.log("user is set")
    user = req.session.user;
  }
  res.render('index', { 
    title: 'MiniGames',
    user: user
  });
});

app.get('/game', function(req, res) {
  res.render('game', { title: 'MiniGames' });
});

app.get('/login', function(req, res) {
  res.render('login', { title: 'MiniGames' });
});

app.get('/register', function(req, res) {
  res.render('register', { title: 'MiniGames' });
});

app.get('/logout', function(req, res) {
  req.session.user = null;
  res.redirect('/');
});

app.post('/register', function(req, res) {
  console.log("got to register");
  var newUser = new User({ 
    name: req.body.name, 
    password: req.body.password
  });
  console.log(newUser);
  newUser.save(function(err) {
    if (err) {
      throw err;
    };
    console.log('User saved successfully');
    req.session.user = newUser.name;
    res.redirect('/');
  });
});

app.post('/login', function(req, res) {
  User.findOne({
    name: req.body.name
  }, function(err, user) {
    if (err) {
      throw err;
    };
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      console.log(user);
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440*60 // expires in 24 hours
        });
        // res.json({
        //   success: true,
        //   message: 'Enjoy your token!',
        //   token: token
        // });
        console.log(req.body.name);
        console.log(user);
        req.session.user = user.name;
        console.log(req.session.user)
        res.redirect('/');
      }
    }
  });
});

app.get('welcome', function(req, res) {
  res.render('lihp', { title: 'Express' });
});

app.get('/authed', isAuthenticated, function(req, res) {
  res.send('index');
});

function isAuthenticated(req, res, next) {

    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    if (req.user.authenticated || true) {
      console.log(req.method);
      return next();
    }
    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect('/');
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
