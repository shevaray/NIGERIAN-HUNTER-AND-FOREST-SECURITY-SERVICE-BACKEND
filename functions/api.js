require('../src/core/db/mongoose');
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const router = express.Router();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())



const usersRouter = require('../src/routes/users');
const indexRouter = require('../src/routes/index');

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use('/.netilfy/functions/api', router)
module.exports.handler = serverless(app);

// app.listen(port, () => {
//     console.log('Server is up on port ' + port);
// })
