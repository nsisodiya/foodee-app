var express = require('express');
var jwt = require('jsonwebtoken');
//const { v4: uuidv4 } = require('uuid');
var UserController = require('../models/UserController');

var router = express.Router();

const privateKey = 'TODO-get it from somewhere';

router.post('/register', async function (req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await UserController.findUserByEmail({ email });
    if (user !== null) {
      res.json({ error: true, errorMessage: 'Email is already registered' });
      return;
    }
    var role = 'REGULAR';
    const dbUser = await UserController.addUser({
      name,
      role,
      email,
      password
    });
    res.json(dbUser);
  } catch (err) {
    console.error('There was an error /register', err, JSON.stringify(err));
    return res.send({
      error: true,
      errorMessage: err
    });
  }
});

router.post('/login', async function (req, res) {
  try {
    const { email, password } = req.body;
    console.log('finding one', email);
    const user = await UserController.findUserByEmail({ email });
    if (user === null) {
      res.json({ error: true, errorMessage: 'Email is not registered' });
      return;
    }
    if (user.password === password) {
      const token = jwt.sign({ role: user.role, id: user.id, email: user.email }, privateKey, {
        expiresIn: '1d'
      });

      res.json({ token, login: 'okay' });
    } else {
      res.json({
        error: true,
        errorMessage: 'Invalid Password.'
      });
    }
  } catch (err) {
    console.error('There was an error /login', err, JSON.stringify(err));
    return res.send({
      error: true,
      errorMessage: err
    });
  }
});

module.exports = router;
