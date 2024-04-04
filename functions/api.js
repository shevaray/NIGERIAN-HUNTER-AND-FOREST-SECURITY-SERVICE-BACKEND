require('../src/core/db/mongoose');
const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const router = express.Router();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors())



const indexRouter = require('../src/routes/index');
const usersRouter = require('../src/routes/users');
const recordsRouter = require('../src/routes/records');

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/records', recordsRouter)

app.use('/.netilfy/functions/api', router)
module.exports.handler = serverless(app);

// app.listen(port, () => {
//     console.log('Server is up on port ' + port);
// })
