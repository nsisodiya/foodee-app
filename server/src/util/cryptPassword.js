var bcrypt = require('bcrypt');

exports.cryptPassword = function (password, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return callback(err);
    }

    bcrypt.hash(password, salt, function (err1, hash) {
      return callback(err1, hash);
    });
  });
};
exports.comparePassword = function (plainPass, hashword, callback) {
  bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
    if (err === null) {
      return callback(null, isPasswordMatch);
    }
    return callback(err);
  });
};
