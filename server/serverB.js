
require('./config/config');

const _= require('lodash');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {MediPlan} = require('./models/mediPlan');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

// Add middleware needed by express.
app.use(bodyParser.json());

// Create mediplans Routes
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

// delete a single mediplan by id
app.delete('/mediplans/:id', (req, res) =>{
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  MediPlan.findByIdAndRemove(id).then( (plan) =>{
    if(!plan) {
      return res.status(404).send()
    }

    res.send(plan);
  }).catch( (e) => {
    res.status(400);
  });
});

app.listen(port, () =>{
  console.log(`Started on port ${port}`);
});

// Create User Routes
app.post('/users', (req, res) =>{

  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() =>{
    // this method returns a promise with the token variale
    return user.generateAuthToken();
  }).then( (token) => {
    res.header('x-auth', token).send(user);
  }).catch( (e) =>{
    res.status(400).send(e);
  });

});

app.get('/users/me', authenticate, (req, res) =>{
  res.send(req.user);
});

module.exports = {app};
