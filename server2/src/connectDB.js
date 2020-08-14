const mongoose = require('mongoose');
require('dotenv').config();

module.exports = () => {
  let dburl = 'mongodb://admin:password@localhost:27017/toptal';
  let mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  };
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dburl, mongooseOptions)
      .then(() => console.log('MongoDB Connected'))
      .then(() => resolve())
      .catch((err) => console.error(err));
    var db = mongoose.connection;
    db.on('error', () => {
      console.error('DB connection error');
      reject();
    });
    db.once('open', function () {
      console.log('Event received - DB OPEN - MongoDB Connected');
    });
  });
};

process.on('SIGINT', function () {
  console.log('Bye bye');
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});
