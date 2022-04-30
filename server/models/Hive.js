const { Schema, model } = require("mongoose");

const hiveSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  latitude: {
    type: String,
  },

  longitude: {
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
  acquisitionSource: {
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
