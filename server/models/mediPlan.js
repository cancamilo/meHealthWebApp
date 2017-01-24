var mongoose = require('mongoose');

var MediPlan = mongoose.model('MediPlan', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  img :{
    data: Buffer,
    contentType: String
  }
});

// Create a model
// For further details on data validation see http://mongoosejs.com/docs/validation.html
// For creating schemas: http://mongoosejs.com/docs/guide.html
// Create documents and save them in the data base
// var medPlan = new MediPlanImg;
// var img1 = 'me1.jpg';
// medPlan.img.data = fs.readFileSync(img1);
// medPlan.img.contentType = 'image/png';
//
// // save and add promise to run after saving
// medPlan.save().then( (doc) =>{
//   console.log(doc);
// }, (e) => {
//   console.log('Unable to save');
// });
//
// var medPlan2 = new MediPlanImg;
// var img2 = 'me2.jpg';
// medPlan2.img.data = fs.readFileSync(img2);
// medPlan2.img.contentType = 'image/png';
//
// // save and add promise to run after saving
// medPlan2.save().then( (doc) =>{
//   console.log(doc);
// }, (e) => {
//   console.log('Unable to save');
// });

module.exports = {MediPlan}
