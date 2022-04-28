const { Schema, model } = require("mongoose");

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
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  // status: {
  //   type: String,
  // },
});

const shareFeeder = model("ShareFeeder", shareFeederSchema);
module.exports = shareFeeder;
