var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then( (user) =>{
    if(!user) {
      return Promise.reject();  // This will cause the catch statement to execute.
    }
    req.user = user;
    req.token = token;
    next();
  }).catch( (e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
