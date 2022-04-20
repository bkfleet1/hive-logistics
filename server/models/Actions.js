const { Schema } = require('mongoose');
const actionsSchema = new Schema({
  actionType: [
    {
      type: String,
    },
  ],
  resource: {
    type: String,
    required: true,
  },
  // saved action id
  id: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
  },
  uam: {
    type: String,
  },
  // actionDate: {
  //   type: Date,
  //   required: true,
  // },
});

module.exports = actionsSchema;
