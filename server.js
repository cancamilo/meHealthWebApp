var express = require('express');
const bodyParser = require('body-parser');


// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));
app.use(express.static('./server/static/'));
app.use(express.static('./app/dist/'));

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);


app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
