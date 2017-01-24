var mongoose = require('mongoose');

var User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  email:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  password:{
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});


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
