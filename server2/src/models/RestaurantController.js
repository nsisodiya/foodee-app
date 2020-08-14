// External Dependancies
const boom = require('boom');
// Get Data Models
const Restaurant = require('./Restaurant');
const ReviewController = require('./ReviewController');

var keys = ['name', 'address', 'cuisines', 'imageurl', 'hours', 'website', 'phone'];

// Get all restaurants
exports.getAllRestaurants = async () => {
  try {
    return await Restaurant.find();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single Restaurant by ID
exports.findRestaurantById = async (_id) => {
  try {
    return await Restaurant.findOne({ _id });
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single Restaurant by ID
exports.findRestaurantByIdWithReviews = async (_id) => {
  try {
    const reviews = await ReviewController.getAllReviewsByRestaurantId(_id);
    const restaurant = await Restaurant.findOne({ _id });
    restaurant.reviews = reviews;
    return restaurant;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Create a new Restaurant
exports.createRestaurant = async (data) => {
  try {
    var filteredData = {};
    keys.forEach((v) => {
      if (data[v] !== undefined) {
        filteredData[v] = data[v];
      }
    });
    console.log('Creating new Restaurant', Restaurant);
    const inst = new Restaurant(filteredData);
    return inst.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing Restaurant
exports.updateRestaurant = async (_id, data) => {
  try {
    var filteredData = {};
    keys.forEach((v) => {
      if (data[v] !== undefined) {
        filteredData[v] = data[v];
      }
    });
    return await Restaurant.findByIdAndUpdate({ _id }, filteredData, { new: true });
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a Restaurant
exports.deleteRestaurant = async (_id) => {
  try {
    return await Restaurant.findByIdAndRemove({ _id });
  } catch (err) {
    throw boom.boomify(err);
  }
};
