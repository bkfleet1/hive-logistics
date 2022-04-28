const mongoose = require("mongoose");

const { Schema } = mongoose;
// import schema Hive
const hiveSchema = require("./Hive");
// import schema from BeeFeeder
const shareFeeSchema = require("./ShareFeeder");

const apiarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // set savedShareFeeder to be an array of data that adheres to the shareFeeSchema
    ShareFeeder: [shareFeeSchema.schema],
    Hive: [hiveSchema.schema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);
const Apiary = mongoose.model("Apiary", apiarySchema);
module.exports = Apiary;
