var express = require('express');
var router = express.Router();
const db = require('../models');
const { v4: uuidv4 } = require('uuid');
/*==========================
    Reviews
    
    Regular user should be able
    
    1. [ ] Create a new Review
    
    
    Admin user should be able
        
    2. [ ] Create a new Review
    3. [ ] Delete a review
  
============================*/

/* GET users listing. */
router.post('/', async (req, res, next) => {
  const timestamp = Date.now();
  const userId = req.loggedUser.id;
  const { comment, rating } = req.body;
  try {
    const myreview = {
      id: uuidv4(),
      timestamp,
      comment,
      rating,
      userId
    };
    console.log('myreview', myreview);
    const review = await db.Review.create(myreview);
    res.json(review);
  } catch (err) {
    console.log('There was an error', err, JSON.stringify(err));
    return res.json({
      error: true,
      fullError: err,
      message: err.name,
      json: JSON.stringify(err)
    });
  }
});

module.exports = router;
