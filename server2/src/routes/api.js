var express = require('express');
var UserController = require('../models/UserController');
var RestaurantController = require('../models/RestaurantController');
var ReviewController = require('../models/ReviewController');

var router = express.Router();

router.get('/me', async function (req, res) {
  try {
    const { email } = req.loggedUser;
    const inst = await UserController.findUserByEmail({ email });
    return res.json(inst);
  } catch (err) {
    console.log('There was an error /me', err, JSON.stringify(err));
    return res.json({
      error: true,
      errorMessage: err
    });
  }
});
router.get('/getRestaurantWithReviews/:_id', async function (req, res) {
  try {
    const { _id } = req.params;
    const inst = await RestaurantController.findRestaurantByIdWithReviews(_id);
    return res.json(inst);
  } catch (err) {
    console.log('There was an error /me', err, JSON.stringify(err));
    return res.json({
      error: true,
      errorMessage: err
    });
  }
});

router.get('/getAllReviewsByRestaurantId/:_id', async function (req, res) {
  try {
    const { _id } = req.params;
    const inst = await ReviewController.getAllReviewsByRestaurantId(_id);
    return res.json(inst);
  } catch (err) {
    console.log('There was an error /me', err, JSON.stringify(err));
    return res.json({
      error: true,
      errorMessage: err
    });
  }
});
router.get('/getReviewsAllRestaurant', async function (req, res) {
  try {
    const inst = await ReviewController.getAvgReviews();
    inst.forEach((v) => {
      v.restaurant = v._id;
      delete v._id;
    });
    return res.json(inst);
    //db.reviews.aggregate([{$group : {_id : "$restaurant", totalReviews: {$sum: 1}, avgRating : {$avg : '$rating'}}}])
    // const { _id } = req.params;
    // const inst = await /5f358588adc204837bf05f96/5f358588adc204837bf05f96wController.getAllReviewsByRestaurantId(_id);
    return res.json({ working: 'working' });
  } catch (err) {
    console.log('There was an error /me', err, JSON.stringify(err));
    return res.json({
      error: true,
      errorMessage: err
    });
  }
});
//getAllReviewsByRestaurantId

module.exports = router;
