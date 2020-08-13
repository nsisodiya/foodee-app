const mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    address: {
      type: String,
      trim: true,
      required: true
    },
    cuisines: {
      type: String,
      trim: true,
      required: true
    },
    imageurl: {
      type: String,
      trim: true
    },
    hours: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  {
    strict: true,
    versionKey: false
  }
);
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
console.log('Create Restaurant Schema');
module.exports = Restaurant;
