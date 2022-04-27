const { Schema } = require("mongoose");
const Schema = hiveSchema({

  shareFeederId: {
    type: String,
    required: true
  },
  
  latitude: 
    {
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
  applicationSource: {
    type: String,
  },
   acquisitionDate: {
     type: Date,
     required: true,
  },
  boxType: {
    type: String,
  },
  frameCount: {
    type: String,
  },
  deploymentDate: {
     type: Date,
   },
});

module.exports = hiveSchema;
