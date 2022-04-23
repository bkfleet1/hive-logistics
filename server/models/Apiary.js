const { Schema } = require('mongoose');

const apiarySchema = new Schema({
  name: [
    {
      type: String,
      required: true,
    }
  ],

  apiaryId: {
    type: String,
    required: true
  },
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
module.exports = apiarySchema;
