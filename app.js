var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jsEncode = require('./p2');
var mongoose = require('mongoose');

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
//app.use('/', routes);


app.get('/', function(req, res) {
  res.render('home', { title: 'Express' });
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
    res.json({ success: true });
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
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440*60 // expires in 24 hours
        });
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

app.get('welcome', function(req, res) {
  res.render('lihp', { title: 'Express' });
});

app.post('/test', function(req, res) {
  //var message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur maximus augue vitae porttitor. Pellentesque ac massa quis felis ullamcorper eleifend. Fusce hendrerit enim in metus elementum, sit amet fermentum ex lacinia. Suspendisse a consectetur velit. Phasellus placerat risus at nisi varius, sit amet feugiat massa feugiat. Curabitur pretium facilisis magna. Nulla tincidunt dignissim enim at aliquam. Nullam lobortis pellentesque arcu. Nulla sem sapien, porttitor nec semper vitae, placerat suscipit neque. Quisque ac bibendum arcu. Quisque convallis maximus finibus. Donec eu dignissim turpis. Vestibulum tincidunt, tellus eget viverra malesuada, tortor velit sagittis ipsum, ut condimentum nibh urna id purus. Ut eget molestie turpis, quis elementum ex. Suspendisse potenti. Sed vel eros nec libero tempor bibendum quis a dui. Vestibulum eget nunc sed est malesuada gravida vel pretium orci. Integer dolor nunc, semper sit amet risus at, accumsan interdum sapien. Mauris mauris nisl, accumsan vitae lobortis vel, faucibus at ligula. Donec vel augue vestibulum, semper urna in, bibendum eros. Vivamus sed augue convallis, laoreet ante eu, luctus libero. Curabitur aliquam, tellus id ultrices euismod, purus nulla placerat metus, non convallis turpis lectus non massa. Aliquam at eleifend purus. Donec quam nisl, molestie nec eros non, feugiat mattis augue. Nunc non placerat ipsum. In aliquam erat sit amet quam lobortis, eget faucibus est ultricies. Duis orci ante, tempus id semper quis, mattis sit amet leo. Aenean venenatis elit in libero pulvinar, id vestibulum sem luctus. Aenean eu ornare mi. Proin non purus et eros commodo facilisis id non odio. Cras eget pharetra leo. Duis cursus quis ipsum at iaculis. Donec in felis sit amet sapien ultricies cursus. Morbi arcu justo, consectetur vitae suscipit nec, viverra porta felis. Nullam risus nunc, venenatis volutpat purus id, euismod fermentum quam. Duis ut neque in velit tristique lacinia. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed porttitor, justo eget placerat lobortis, elit velit hendrerit ipsum, vitae dapibus magna enim nec tellus. Pellentesque id nisi in elit interdum finibus. Sed ut eros sit amet metus vulputate varius. Fusce felis nisi, tristique eu augue at, aliquet volutpat nibh. Cras ut porta leo. Sed eu mi vitae dolor sodales congue ac sit amet nisi. Maecenas sollicitudin hendrerit sem, sit amet suscipit magna volutpat ut. Praesent suscipit lacus diam, ut dapibus enim mattis sed. Mauris molestie turpis est, ac vehicula velit auctor congue. Donec finibus ex eu tincidunt convallis. Nulla facilisi. Nam in semper metus. Pellentesque iaculis, libero quis venenatis dapibus, elit mauris euismod sapien, in consectetur mi velit at tellus. Sed ut pretium massa. Integer venenatis, quam rutrum sollicitudin feugiat, dui nunc bibendum eros, non tincidunt urna elit a dui. Donec id accumsan justo. Morbi hendrerit ipsum nunc, nec consectetur felis congue ac. Duis eu porttitor orci. Fusce vitae mi sit amet est condimentum dictum. Donec sit amet porttitor velit, eget mollis tellus. In fermentum eget purus semper viverra. Fusce vitae venenatis nisi, quis porta mauris. Sed eget lorem bibendum, suscipit justo eu, tristique eros. Donec eu consectetur nunc. Duis facilisis vehicula felis, vitae.";
  //console.log(jsEncode.encode.toString());
  var message = req.body.message;

  var key = "123";

  var e = jsEncode.encode(message,key);
  console.log('binary:', e);
  var base64data = jsEncode.base64ify(e);
  console.log('base64:', base64data);
  var originaldata = jsEncode.unBase64(base64data);
  console.log('binary:', originaldata);
  var d = jsEncode.encode(originaldata,key);
  console.log(d);
  
  //res.render('index', { title: 'Express' });
  res.send("got post message " + message);
  //res.render('index', { title: 'Express' });
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
