const { Schema, model } = require("mongoose");

const hiveSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  lat: {
    type: String,
  },

  lng: {
    type: String,
    required: true,
  },
  // saved action id
  status: {
    type: String,
    required: true,
  },
  beeBreed: {
    type: String,
  },
  applicationSource: {
    type: String,
  },
  acquisitionDate: {
    type: Date,
    default: Date.now
   
  },
  boxType: {
    type: String,
  },
  frameCount: {
    type: String,
  },
  deploymentDate: {
   type: Date,
  default: Date.now 
  }
});

const Hive = model("Hive", hiveSchema);
module.exports = Hive;
