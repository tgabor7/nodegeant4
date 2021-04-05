var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();


var gammaAPIRouter = require("./routes/gammaAPI");
var geometryRouter = require("./routes/geometryAPI");
var compundRouter = require("./routes/CompoundAPI");
var sourceRouter = require("./routes/SourceAPI");
var elementRouter = require("./routes/ElementAPI");
var userRouter = require("./routes/loginAPI");
var projectRouter = require("./routes/projectAPI");
var logRouter = require("./routes/log");

var app = express();



app.disable('etag');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));
app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'login')));
app.use(express.static(path.join(__dirname, 'dashboard')));

app.use("/gammaAPI", gammaAPIRouter);
app.use("/geometryAPI", geometryRouter);
app.use("/compoundAPI", compundRouter);
app.use("/elementAPI", elementRouter);
app.use("/sourceAPI", sourceRouter);
app.use("/userAPI", userRouter);
app.use("/projectAPI", projectRouter);
app.use("/log", logRouter);
app.use('/', express.static('./public'));
app.use('/Login', express.static('./login'));
app.use('/Dashboard', express.static('./dashboard'));
app.use('/Help', express.static('./public/help'));

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
