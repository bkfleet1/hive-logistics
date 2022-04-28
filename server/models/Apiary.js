const { Schema, model } = require('mongoose');

const apiarySchema = new Schema({
  name: 
    {
      type: String,
      required: true,
    },
  

  // apiaryId: {
  //   type: String,
  //   required: true
  // },
  // set savedShareFeeder to be an array of data that adheres to the shareFeederSchema
   //  savedAShareFeeder: [shareFeederSchema],
    // savedHive: [HiveSchema],
},
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);
const apiary = model("Apiary", apiarySchema);
module.exports = apiarySchema;
