const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  password: String
});
var User = mongoose.model('User', UserSchema);
console.log('Create User Schema');
module.exports = User;
