var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {MediPlan} = require('./models/mediPlan');
var {User} = require('./models/user');

var app = express();

// Add middleware needed by express.
app.use(bodyParser.json());

app.post('/mediPlans', (req, res) =>{
  // TODO: in the http post request body. An Image should be included. (This is probably better from the react app.)
  var mediPlan = new MediPlan({
    title: req.body.title
  });

  mediPlan.save().then((doc) =>{
    res.send(doc);
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/mediplans', (req, res) =>{
  MediPlan.find().then((plans) =>{
    res.send({plans})
  }, (e) =>{
    res.status(400).send(e);
  });

});

app.listen(3000, () =>{
  console.log('Started on port 3000');
});

module.exports = {app};
