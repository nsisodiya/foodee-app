var express = require('express');
var router = express.Router();
const UserController = require('../models/UserController.js');

/*==========================
    Admin only routes.
    
    Admin should be able
    
    1. [x] List All User
    2. [ ] Make a normal User as Admin
    3. [ ] Delete a User
    4. [ ] Modify any info of a user
============================*/

/* get All Users */
router.get('/', async (req, res, next) => {
  try {
    const users = await UserController.getAllUsers();
    res.json(users);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send(err);
  }
});

module.exports = router;
