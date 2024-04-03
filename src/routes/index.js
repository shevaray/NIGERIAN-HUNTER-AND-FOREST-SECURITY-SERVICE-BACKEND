const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
  res.send('App is running...')
})

module.exports = Router