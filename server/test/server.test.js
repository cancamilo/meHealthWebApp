const expect = require('expect');
const request = require('supertest');

const {app} = require('./../serverB');
const {MediPlan} = require('./../models/mediPlan');

// let us run some code before each test case is run
beforeEach( (done) =>{
  MediPlan.remove({}).then(() =>  done());
});

describe('POST /mediplans', () =>{
  it('should create a new mediplan', (done) =>{
    var title = 'Mediplan for heart disease';

    request(app)                          // Makes request to the app imported above.
    .post('/mediplans')                   // makes a post request to the mediplans url.
    .send({title})                        // sends title as the body.
    .expect(200)                          // expects succesful code
    .expect((res) => {
      expect(res.body.title).toBe(title); // expects the response to have the titled we just sent.
    })
    .end((err, res) =>{                   // callback after request and response completed
      if (err) {
        return done(err);
      }

      MediPlan.find().then((mediplans) => {     // verifies that the record we sent was indeed saved in the database.
        expect(mediplans.length).toBe(1);
        expect(mediplans[0].title).toBe(title);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create medplan with bad data', (done) =>{
    request(app)
    .post('/mediplans')
    .send({})
    .expect(400)
    .end( (err, res) =>{
      if(err){
        return done(err);
      }

      MediPlan.find().then( (mediplans) =>{
        expect(mediplans.length).toBe(0);
        done();
      }).catch( (e) => done(e));
    });
  });

});
