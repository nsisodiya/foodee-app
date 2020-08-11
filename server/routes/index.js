var rootRouter = require('./root');
var usersRouter = require('./users');
var authRouter = require('./auth');
var meRouter = require('./me');
var jwt = require('jsonwebtoken');
const privateKey = 'TODO-get it from somewhere';

const authMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      return res.json({
        error: true,
        message: 'Authorization headers are not provided'
      });
    } else {
      var token = req.headers.authorization.split(' ')[1];
      var decoded = await jwt.verify(token, privateKey);
      req.loggedUser = decoded;
      next();
    }
  } catch (err) {
    console.log('There was an error /me', err, JSON.stringify(err));
    return res.json({
      error: true,
      fullError: err,
      name: err.name,
      json: JSON.stringify(err)
    });
  }
};

const AdminRoleMiddleware = async (req, res, next) => {
  try {
    if (req.loggedUser.role === 'ADMIN') {
      next();
    } else {
      return res.json({
        error: true,
        message: 'Auth Error: Role is not sufficient'
      });
    }
  } catch (err) {
    console.log('There was an error /me', err, JSON.stringify(err));
    return res.json({
      error: true,
      fullError: err,
      name: err.name,
      json: JSON.stringify(err)
    });
  }
};

module.exports = (app) => {
  console.log('Setting up Routes');
  app.use('/', rootRouter);
  app.use('/users', authMiddleware, AdminRoleMiddleware, usersRouter);
  app.use('/auth', authRouter);
  app.use('/me', authMiddleware, meRouter);
};
