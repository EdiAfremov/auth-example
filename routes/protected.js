var express = require('express');
var router = express.Router();
var { authenticate } = require('./../middleware/authenticate');

router.get('/', authenticate, (req, res) => {
  res.send('you are now logged in');
});

module.exports = router;
