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

// Get single User by email
exports.findUserByEmail = async ({ email }) => {
  try {
    const userInst = await User.findOne({ email });
    return userInst;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Create a new User
exports.createUser = async ({ name, email, password, role }) => {
  //TODO validate
  try {
    console.log('Creating new User', User);
    const userInst = new User({ name, email, password, role });
    return userInst.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a User
exports.deleteUser = async (_id) => {
  try {
    const userInst = await User.findByIdAndRemove({ _id });
    return userInst;
  } catch (err) {
    throw boom.boomify(err);
  }
};
