const { Schema } = require('mongoose');

const apiarySchema = new Schema({
  name: [
    {
      type: String,
    }
  ],
  
});

module.exports = apiarySchema;
