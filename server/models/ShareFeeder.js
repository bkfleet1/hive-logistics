const { Schema, model } = require('mongoose');

const shareFeederSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  longitude: {
    type: String,
    required: true,
    trim: true,
  },
  longitude: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    trim: true
  }
});

const ShareFeeder = model("ShareFeeder", shareFeederSchema);
module.exports = ShareFeeder;
