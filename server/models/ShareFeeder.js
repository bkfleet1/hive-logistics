const mongoose = require('mongoose');

const { Schema } = mongoose;

const shareFeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  }
});

const ShareFeeder = mongoose.model("ShareFeeder", shareFeeSchema);
module.exports = ShareFeeder;
