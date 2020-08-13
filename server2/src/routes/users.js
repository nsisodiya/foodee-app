var express = require('express');

var router = express.Router();
const UserController = require('../models/UserController.js');

/*==========================
    Admin only routes.

    Admin should be able

    1. [x] List All User
    2. [ ] Make a normal User as Admin
    3. [x] Delete a User
    4. [ ] Modify any info of a user
============================*/

/* get All Users */
router.get('/', async (req, res) => {
  try {
    const insts = await UserController.getAllUsers();
    res.json(insts);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send(err);
  }
});

/* get All Users */
router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const inst = await UserController.deleteUser(_id);
    if (inst === null) {
      return res.json({
        inst,
        success: 'Something wrong. Probably :id dont exist'
      });
    }
    res.json({
      inst,
      success: 'User deleted'
    });
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send(err);
  }
});

module.exports = router;
