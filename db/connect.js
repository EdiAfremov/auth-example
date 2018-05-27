const mongoose = require('mongoose');

///auth-example-google-ediafremov mLab
const dbURL =
  'mongodb://edi:edia11@ds119060.mlab.com:19060/auth-example-google-ediafremov';
mongoose.Promise = global.Promise;
mongoose.connect(dbURL, () => {
  console.log('connected to mongo');
});

module.exports = { mongoose };
