const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([
    {
      age: '45',
      name: 'nodemon'
    },
    {
      age: '34',
      name: 'nodemania'
    }
  ]);
});

module.exports = router;
