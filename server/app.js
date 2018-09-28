var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 专门做cookie处理的插件
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var noticesRouter = require('./routes/notices');
var parksRouter = require('./routes/parks');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notices', noticesRouter);
app.use('/parks', parksRouter);

// 登录拦截
app.use(function(req, res, next) {
    if (req.cookies.userId) {
        next();
    } else {
        // 设置白名单，即未登录也可以调用
        // if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' || req.originalUrl.indexOf('/parks/list') > -1) {
        if (req.originalUrl == '/users/login' || req.originalUrl == '/users/logout' || req.path == '/parks/list') {
            next();
        } else {
            res.json({
                status: '10001',
                msg: '当前未登录',
                result: ''
            });
        }
    }
});

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
