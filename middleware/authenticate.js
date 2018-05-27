var { User } = require('./../models/user-model');

var authenticate = (req, res, next) => {
  var token = req.header('auth');
  
  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(e => {
      res.status(401).send('not authorized ');
    });
};





module.exports = { authenticate };
