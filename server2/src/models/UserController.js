// External Dependancies
const boom = require('boom');
// Get Data Models
const User = require('./User');

// Get all users
exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single User by ID
exports.getSingleUser = async (req) => {
  try {
    const id = req.params.id;
    const userInst = await User.findById(id);
    return userInst;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new User
exports.addUser = async (req) => {
  try {
    console.log('Adding new User', User);
    const userInst = new User(req.body);
    return userInst.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing User
exports.updateUser = async (req) => {
  try {
    const id = req.params.id;
    const userInst = req.body;
    const { ...updateData } = userInst;
    const update = await User.findByIdAndUpdate(id, updateData, { new: true });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a User
exports.deleteUser = async (req) => {
  try {
    const id = req.params.id;
    const userInst = await User.findByIdAndRemove(id);
    return userInst;
  } catch (err) {
    throw boom.boomify(err);
  }
};
