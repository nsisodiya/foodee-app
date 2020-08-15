const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    enum: ['Admin', 'REGULAR'],
    default: 'REGULAR',
    required: true,
    trim: true
  }
});
// UserSchema.pre('save', function (next) {
//   // check if password is present and is modified.
//   if (this.password && this.isModified('password')) {
//     // call your hashPassword method here which will return the hashed password.
//     this.password = hashPassword(this.password);
//   }
//   // everything is done, so let's call the next callback.
//   next();
// });

UserSchema.set('toJSON', {
  virtuals: true
});
var User = mongoose.model('User', UserSchema);
console.log('Create User Schema');
module.exports = User;
