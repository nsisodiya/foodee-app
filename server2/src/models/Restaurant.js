const mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  cuisines: {
    type: String,
    required: true
  },
  imageurl: {
    type: String,
    required: true
  },
  hours: {
    type: String
  },
  website: {
    type: String
  },
  phone: {
    type: String
  }
});
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
console.log('Create Restaurant Schema');
module.exports = Restaurant;
