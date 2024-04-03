require('./core/db/mongoose');
const express = require('express');

const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/users', usersRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})