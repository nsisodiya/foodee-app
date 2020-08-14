// External Dependancies
const boom = require('boom');
// Get Data Models
const Review = require('./Review');

var keys = ['comment', 'rating', 'visitDate', 'user', 'restaurant'];

// Get all Reviews
exports.getAllReviews = async () => {
  try {
    return await Review.find();
  } catch (err) {
    throw boom.boomify(err);
  }
};
// getAll AvgRatings and total Reviews;
exports.getAvgReviews = async () => {
  //  db.reviews.aggregate([{$group : {_id : "$restaurant", totalReviews: {$sum: 1}, avgRatings : {$avg : '$rating'}}}])
  try {
    return await Review.aggregate([
      { $group: { _id: '$restaurant', totalReviews: { $sum: 1 }, avgRatings: { $avg: '$rating' } } }
    ]);
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get all Reviews
exports.getAllReviewsByRestaurantId = async (restaurant) => {
  try {
    return await Review.find({ restaurant });
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single Review by ID
exports.findReviewById = async (_id) => {
  try {
    return await Review.findOne({ _id });
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Create a new Review
exports.createReview = async (data) => {
  try {
    var filteredData = {};
    keys.forEach((v) => {
      if (data[v] !== undefined) {
        filteredData[v] = data[v];
      }
    });
    console.log('Creating new Review', Review);
    const inst = new Review(filteredData);
    return inst.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing Review
exports.updateReview = async (_id, data) => {
  try {
    var filteredData = {};
    keys.forEach((v) => {
      if (data[v] !== undefined) {
        filteredData[v] = data[v];
      }
    });
    return await Review.findByIdAndUpdate({ _id }, filteredData, { new: true });
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a Review
exports.deleteReview = async (_id) => {
  try {
    return await Review.findByIdAndRemove({ _id });
  } catch (err) {
    throw boom.boomify(err);
  }
};
