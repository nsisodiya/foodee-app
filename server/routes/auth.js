var express = require('express');
var router = express.Router();
const db = require('./../models');
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcrypt');

const cryptPassword = function (password, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return callback(err);

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
/* 
POST /register - 
body   {
       email: "",
       password: "",
       name: ""
   }

return JWT token
*/
router.post('/register', function (req, res, next) {
  const { name, email, password } = req.body;
  return db.User.create({ id: uuidv4(), name, email, password })
    .then(({ name, email, id }) => res.json({ name, email, id }))
    .catch((err) => {
      console.log('There was an error querying users', JSON.stringify(err));
      return res.send({
        error: true,
        message: err.name
      });
    });
});

/* 
POST /login - 
body   {
       email: "",
       password: ""
   }

return JWT token
*/
router.post('/login', function (req, res, next) {
  return db.User.findAll()
    .then((users) => res.json(users))
    .catch((err) => {
      console.log('There was an error querying users', JSON.stringify(err));
      return res.send(err);
    });
});

module.exports = router;
