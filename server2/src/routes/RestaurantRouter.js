var express = require('express');

var router = express.Router();
const RestaurantController = require('../models/RestaurantController.js');

/*==========================
    Admin only routes.

    Admin should be able

    1. [ ] Create a restaurant
    2. [ ] get a restaurant
    3. [ ] get all restaurants
    3. [ ] Update a restaurant
    4. [ ] Delete a restaurant
============================*/

/* get All Restaurants */
router.get('/', async (req, res) => {
  try {
    const restaurants = await RestaurantController.getAllRestaurants();
    res.json(restaurants);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send(err);
  }
});

/* get a restaurant */
router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const inst = await RestaurantController.findRestaurantById(_id);
    res.json(inst);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send(err);
  }
});

/* Create a restaurant */
router.post('/', async (req, res) => {
  try {
    const inst = await RestaurantController.createRestaurant(req.body);
    res.json(inst);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send(err);
  }
});

/* Update a restaurant */
router.put('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const inst = await RestaurantController.updateRestaurant(_id, req.body);
    res.json(inst);
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send(err);
  }
});

/* Delete a Restaurant */
router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await RestaurantController.deleteRestaurant(_id);
    if (restaurant === null) {
      return res.json({
        restaurant,
        success: 'Something wrong. Probably :id dont exist'
      });
    }
    res.json({
      restaurant,
      success: 'Restaurant deleted'
    });
  } catch (err) {
    console.log('There was an error /', JSON.stringify(err));
    return res.send(err);
  }
});

module.exports = router;
