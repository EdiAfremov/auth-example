var { User } = require('./../models/user-model');

var findOrCreateProfile = (req, res, next) => {
  if (!req.params.provider) {
    throw new Error('please check provider');
  }

  if (!req.body) {
    throw new Error('please check provider');
  }

  const provider = req.params.provider;

  let providerNameId = `${provider}Id`;

  let data = {};
  data.providerNameId = req.body.id;
  data.username = req.body.username;
  data.email = req.body.email;

  let set = { $set: {} };
  set.$set[`${providerNameId}`] = data.providerNameId;

  User.findOneAndUpdate({ email: data.email }, set, {
    new: true
  }).then(userExists => {
    if (userExists) {
      userExists.generateAuthToken().then(token => {
        req.user = { token: token, username: data.username };
        return next();
      });
    } else {
      new User(data).save().then(user => {
        user.generateAuthToken().then(token => {
          req.user = { token: token, username: data.username };
          return next();
        });
      });
    }
  });
};

module.exports = { findOrCreateProfile };
