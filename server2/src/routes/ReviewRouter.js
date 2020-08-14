var express = require('express');

var router = express.Router();
const ReviewController = require('../models/ReviewController.js');

/*==========================
    Admin only routes.

    Admin should be able

    1. [x] Create a review
    2. [x] get a review
    3. [x] get all reviews
    3. [x] Update a review
    4. [x] Delete a review
============================*/

/* get All Reviews */
router.get('/', async (req, res) => {
  try {
    const insts = await ReviewController.getAllReviews();
    res.json(insts);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send({
      error: true,
      errorMessage: err
    });
  }
});

/* get a review */
router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const inst = await ReviewController.findReviewById(_id);
    res.json(inst);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send({
      error: true,
      errorMessage: err
    });
  }
});

/* Create a review */
router.post('/', async (req, res) => {
  try {
    //We need to add User Id to the body
    const user = req.loggedUser.id;
    const visitDate = Date.now();
    const inst = await ReviewController.createReview({ ...req.body, user, visitDate });
    res.json(inst);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send({
      error: true,
      errorMessage: err
    });
  }
});

/* Update a review */
router.put('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const inst = await ReviewController.updateReview(_id, req.body);
    res.json(inst);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send({
      error: true,
      errorMessage: err
    });
  }
});

/* Delete a Review */
router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const inst = await ReviewController.deleteReview(_id);
    if (inst === null) {
      return res.json({
        inst,
        success: 'Something wrong. Probably :id dont exist'
      });
    }
    res.json({
      inst,
      success: 'Review deleted'
    });
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send({
      error: true,
      errorMessage: err
    });
  }
});

module.exports = router;
