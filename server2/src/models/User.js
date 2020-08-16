const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

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
    enum: ['Admin', 'REGULAR'],
    default: 'REGULAR',
    trim: true
  },
  password: {
    type: String,
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
UserSchema.pre('save', function (next) {
  // eslint-disable-next-line babel/no-invalid-this
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err1, hash) {
      if (err1) {
        return next(err1);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
var User = mongoose.model('User', UserSchema);
console.log('Create User Schema');
module.exports = User;
