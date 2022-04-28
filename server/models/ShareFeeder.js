const mongoose = require('mongoose');

const { Schema } = mongoose;

const shareFeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  longitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  }
});

const ShareFeeder = mongoose.model("ShareFeeder", shareFeeSchema);
module.exports = ShareFeeder;
