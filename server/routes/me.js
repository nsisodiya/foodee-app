var express = require('express');
var router = express.Router();
const db = require('./../models');

router.get('/', async function (req, res) {
  try {
    var decoded = req.loggedUser;
    const { email, name, id } = await db.User.findOne({
      where: { email: decoded.email }
    });
    return res.json({ email, name, id });
  } catch (err) {
    console.log('There was an error /me', err, JSON.stringify(err));
    return res.json({
      error: true,
      fullError: err,
      name: err.name,
      json: JSON.stringify(err)
    });
  }
});
module.exports = router;
