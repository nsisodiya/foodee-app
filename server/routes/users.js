var express = require('express');
var router = express.Router();
const db = require('./../models');

/*==========================
    Admin only routes.
    
    Admin should be able
    
    1. [x] List All User
    2. [ ] Make a normal User as Admin
    3. [ ] Delete a User
    4. [ ] Modify any info of a user
============================*/

/* POST review */
router.post('/', async (req, res, next) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    console.log('There was an error querying users', JSON.stringify(err));
    return res.send(err);
  }
});

module.exports = router;
