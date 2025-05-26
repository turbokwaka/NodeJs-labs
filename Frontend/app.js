var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware (should be before routes)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const guestRoutes = require('./routes/guestRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use(guestRoutes);
app.use(adminRoutes);

// 404 handler (after all valid routes)
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler (should be last)
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));

module.exports = app;