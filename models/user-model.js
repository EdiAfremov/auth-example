const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;

let userSchema = new Schema({
  username: String,
  googleId: String,
  facebookId: String,
  email: {
    type: String,
    unique: true
  },
  token: String
});

userSchema.methods.generateAuthToken = function() {
  var user = this;
  var token = jwt
    .sign({ _id: user._id.toHexString(), username: user.username }, 'abc123', {
      expiresIn: '5m'
    })
    .toString();
  user.token = token;

  return user.save().then(() => token);
};

userSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    _id: decoded._id,
    token: token
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
