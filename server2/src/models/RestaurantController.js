// External Dependancies
const boom = require('boom');
// Get Data Models
const Restaurant = require('./Restaurant');

var keys = ['name', 'address', 'cuisines', 'imageurl', 'hours', 'website', 'phone'];

// Get all restaurants
exports.getAllRestaurants = async () => {
  try {
    const restaurants = await Restaurant.find();
    return restaurants;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single Restaurant by ID
exports.findRestaurantById = async (_id) => {
  try {
    const restaurantInst = await Restaurant.findOne({ _id });
    return restaurantInst;
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
    const restaurantInst = new Restaurant(filteredData);
    return restaurantInst.save();
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
    const update = await Restaurant.findByIdAndUpdate({ _id }, filteredData, { new: true });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a Restaurant
exports.deleteRestaurant = async (_id) => {
  try {
    const restaurantInst = await Restaurant.findByIdAndRemove({ _id });
    return restaurantInst;
  } catch (err) {
    throw boom.boomify(err);
  }
};
