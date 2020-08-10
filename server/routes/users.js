var express = require('express');
var router = express.Router();
const db = require('./../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  return db.User.findAll()
    .then((users) => res.json(users))
    .catch((err) => {
      console.log('There was an error querying users', JSON.stringify(err));
      return res.send(err);
    });
});

module.exports = router;
