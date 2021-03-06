var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cors= require('cors');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
// Secure traffic only

var routes = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var favoriteRouter = require('./routes/favoriteRouter');


var app = express();

//app.use(cors({origin: 'null'}));
app.use(passport.initialize());


app.all('*', function(req, res, next){
    console.log('req start: ',req.secure, 'ec2-13-56-19-106.us-west-1.compute.amazonaws.com', req.url, app.get('port'));
  if (req.secure) {
    return next();
  };

 res.redirect('https://'+'ec2-13-56-19-106.us-west-1.compute.amazonaws.com'+':'+app.get('secPort')+req.url);
});

mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); 

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use('/bower_components', express.static(path.join(__dirname, 'Frontend/bower_components')));
app.use('/styles', express.static(path.join(__dirname, 'Frontend/dist/styles')));
app.use('/scripts', express.static(path.join(__dirname, 'Frontend/dist/scripts')));
app.use('/views', express.static(path.join(__dirname, 'Frontend/dist/views')));
app.use('/images', express.static(path.join(__dirname, 'Frontend/dist/images')));
app.use('/fonts', express.static(path.join(__dirname, 'Frontend/dist/fonts')));



app.use('/', routes);
app.use('/users', users);
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leadership',leaderRouter);
app.use('/favorites', favoriteRouter)

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
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
