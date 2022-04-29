const mongoose = require('mongoose');

<<<<<<< HEAD
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hiveLogisticDb',{
  mongoose.connect(
    process.env.MONGODB_URI ||
     "mongodb+srv://user:password999@cluster0.1jie0.mongodb.net/hiveLogisticDb",{
=======
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hiveLogisticDb',{
>>>>>>> 53882e7405adcbdd5db06f54b65cf7f419050e39
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}
);

module.exports = mongoose.connection;
