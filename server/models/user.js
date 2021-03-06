const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _= require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// Instance methods
UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then( () => {
    return token;
  });
};

// Static methods
UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }

  // Find a user whos token array has a property which equals the token
  // provided above.
  return User.findOne({
    '_id': decoded._id,
    'tokens.token':token,
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function (next){
  var user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) =>{
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    })
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema );


// Create Users
// var aUser = new User({
//   name: 'Camilo',
//   email: 'adad@wef.com',
//   password: '12345'
// });
//
// aUser.save().then((doc) =>{
//   console.log('User saved', doc);
// }, (e) =>{
//   console.log('Unable to save user', e);
// });

module.exports = {User}
