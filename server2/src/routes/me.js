var express = require('express');
var UserController = require('../models/UserController');

var router = express.Router();

router.get('/', async function (req, res) {
  try {
    const { email } = req.loggedUser;
    const user = await UserController.findUserByEmail({ email });
    return res.json(user);
  } catch (err) {
    console.log('There was an error /me', err, JSON.stringify(err));
    return res.json({
      error: true,
      errorMessage: err
    });
  }
});
module.exports = router;
