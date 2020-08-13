var express = require('express');
const { v4: uuidv4 } = require('uuid');
var UserController = require('../models/UserController');

var router = express.Router();

//var jwt = require('jsonwebtoken');

//const privateKey = 'TODO-get it from somewhere';

router.post('/register', async function (req, res) {
  const { name, email, password } = req.body;
  var role = 'REGULAR';
  try {
    const dbUser = await UserController.addUser({
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
    console.error('There was an error /register', JSON.stringify(err));
    return res.send({
      error: true,
      errorMessage: err.name
    });
  }
});

module.exports = router;
