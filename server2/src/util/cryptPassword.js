const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcrypt');
const cryptPassword = function (password, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err)
      return callback(err);

    bcrypt.hash(password, salt, function (err, hash) {
      return callback(err, hash);
    });
  });
};
const comparePassword = function (plainPass, hashword, callback) {
  bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
    return err == null ? callback(null, isPasswordMatch) : callback(err);
  });
};
