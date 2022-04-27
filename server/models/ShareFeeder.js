const { Schema } = require("mongoose");
const shareFeederSchema = new Schema({ 
  name: 
    {
      type: String,
      required: true,
    },
  // shareFeederId: {
  //   type: String,
  //   required: true
  // },
  latitude: {
    type: String,
    required: true,
    validate:{
      len: [4]
    },
  },
  longitude: {
    type: String,
    required: true,
    validate:{
      len: [4]
    },
  },
  // status: {
  //   type: String,
  // },
});

module.exports = shareFeederSchema;
