const mongoose = require('mongoose');

//mongoose.connect(process.env.MONGODB_ENDPOINT || 'mongodb://localhost/hiveLogisticDb', {
  mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://user:password999@cluster0.1jie0.mongodb.net/hiveLogisticDb",
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
