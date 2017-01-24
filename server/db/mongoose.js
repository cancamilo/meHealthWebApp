

var mongoose = require('mongoose');

// Tell mongose what promise library to use
mongoose.Promise = global.Promise;

// Connects to data base, creating meHealthApp if it does not exist.
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose: mongoose
};
