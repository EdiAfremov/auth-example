var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');
var mongooseConnect = require('./../db/connect');
var { User } = require('../models/user-model');
var { findOrCreateProfile } = require('./../middleware/findOrCreateProfile');
var { authenticate } = require('./../middleware/authenticate');

router.get('/', authenticate, (req, res) => {
  res.status(200).send('authorized');
});

router.post('/:provider', findOrCreateProfile, (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;
