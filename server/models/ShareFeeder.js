const { Schema } = require("mongoose");
const shareFeederSchema = new Schema({
  name: {
    type: String,
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
  },
});

module.exports = shareFeederSchema;