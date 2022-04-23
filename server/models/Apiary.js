const { Schema } = require('mongoose');

const apiarySchema = new Schema({
  name: [
    {
      type: String,
      required: true,
    }
  ],

  apiaryId: {
    type: String,
    required: true
  },
});

module.exports = apiarySchema;
