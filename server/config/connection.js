const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hiveLogisticDb',{
  // mongoose.connect(
  //   process.env.MONGODB_URI ||
  //    "mongodb+srv://user:password999@cluster0.1jie0.mongodb.net/hiveLogisticDb",{
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}
);

module.exports = mongoose.connection;
