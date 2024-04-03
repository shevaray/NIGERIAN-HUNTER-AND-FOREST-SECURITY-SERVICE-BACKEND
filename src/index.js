require('./core/db/mongoose');
const express = require('express');
const serverless = require('serverless-http');

const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/users', usersRouter)

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