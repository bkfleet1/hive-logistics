const { Schema } = require("mongoose");
// import schema Hive
const hiveSchema = require("./Hive");
// import schema from BeeFeeder
const shareFeederSchema = require("./BeeFeeder");


const apiarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // set savedShareFeeder to be an array of data that adheres to the shareFeederSchema
     ShareFeeder: [shareFeederSchema],
     Hive: [hiveSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);
module.exports = apiarySchema;
