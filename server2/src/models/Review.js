const mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    trim: true,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  visitDate: {
    type: Number,
    trim: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  }
});
var Review = mongoose.model('Review', ReviewSchema);
console.log('Create Review Schema');
module.exports = Review;
