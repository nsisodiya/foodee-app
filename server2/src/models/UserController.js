// External Dependancies
const boom = require('boom');
// Get Data Models
const User = require('./User');

// Get all users
exports.getAllUsers = async () => {
  try {
    return User.find();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single User by email
exports.findUserByEmail = async ({ email }) => {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Create a new User
exports.createUser = async ({ name, email, password, role }) => {
  //TODO validate
  try {
    console.log('Creating new User', User);
    const inst = new User({ name, email, password, role });
    return inst.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a User
exports.deleteUser = async (_id) => {
  try {
    return await User.findByIdAndRemove({ _id });
  } catch (err) {
    throw boom.boomify(err);
  }
};
