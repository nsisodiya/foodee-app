var express = require('express');
var router = express.Router();
const db = require('./../models');
const { v4: uuidv4 } = require('uuid');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const privateKey = 'TODO-get it from somewhere';

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
router.post('/register', async function (req, res, next) {
  const { name, email, password } = req.body;
  var role = 'REGULAR';
  try {
    const dbUser = await db.User.create({
      id: uuidv4(),
      name,
      role,
      email,
      password
    });
    res.json({
      role: dbUser.role,
      name: dbUser.name,
      email: dbUser.email,
      id: dbUser.id
    });
  } catch (err) {
    console.log('There was an error /register', JSON.stringify(err));
    return res.send({
      error: true,
      errorMessage: err.name
    });
  }
});

/* 
POST /login - 
body   {
       email: "",
       password: ""
   }

return JWT token
*/
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log('finding one', email);
    const user = await db.User.findOne({ where: { email } });
    if (user === null) {
      res.json({ error: true, message: 'Invalid email or password' });
    }
    if (user.password === password) {
      const token = jwt.sign(
        { role: user.role, id: user.id, email: user.email },
        privateKey,
        {
          expiresIn: '1d'
        }
      );

      res.json({ token, login: 'okay' });
    } else {
      res.json({ error: true, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.log('There was an error /login', err, JSON.stringify(err));
    return res.json({
      error: true,
      fullError: err,
      name: err.name,
      json: JSON.stringify(err)
    });
  }
});

module.exports = router;
