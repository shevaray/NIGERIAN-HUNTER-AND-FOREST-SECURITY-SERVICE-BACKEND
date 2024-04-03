require('../../src/core/db/mongoose');
const express = require('express');
const serverless = require('serverless-http');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const usersRouter = require('../../src/routes/users');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/users', usersRouter)

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

export const handler = serverless(app);

// app.listen(port, () => {
//     console.log('Server is up on port ' + port);
// })