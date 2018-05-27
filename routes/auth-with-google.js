var express = require('express');
var router = express.Router();
var { User } = require('./../models/user-model');
var passport = require('passport');
var { mongoose } = require('./../db/connect');

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile']
  })
);
//callback route for  google to rediretct
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    res.status(200).send(req.user);
    // res.redirect('http://localhost:3001/');
  }
);

module.exports = router;
