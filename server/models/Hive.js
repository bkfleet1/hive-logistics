const { Schema, model } = require("mongoose");

const hiveSchema = new Schema({

  shareFeederId: {
    type: String,
    required: true
  },
  
  latitude: 
    {
      type: String,
      required: true
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
    required: true
  },
  applicationSource: {
    type: String,
  },
  // acquisitionDate: {
  //   type: Date,
  //   required: true,
  // },
  boxType: {
    type: String,
  },
  frameCount: {
    type: String,
  },
  // deploymentDate: {
  //   type: date,
  // },
});

const hive = model("Hive", hiveSchema);
module.exports = hiveSchema;
