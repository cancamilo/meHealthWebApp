var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {MediPlan} = require('./models/mediPlan');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

// fetch all mediplans
app.get('/mediplans', (req, res) =>{
  MediPlan.find().then((plans) =>{
    res.send({plans})
  }, (e) =>{
    res.status(400).send(e);
  });

});

// fetch a single mediplan
app.get('/mediplans/:id', (req, res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    const {ObjectID} = require('mongodb');
    return res.status(404).send();
  }

  MediPlan.findById(id).then( (plan) => {
    if(!plan) {
      return res.status(404).send();
    }
    res.send({plan});
  }).catch( (e) => {
    res.status(400).send();
  });

});

app.listen(port, () =>{
  console.log(`Started on port ${port}`);
});

module.exports = {app};
