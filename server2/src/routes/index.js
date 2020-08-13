var express = require('express');
var jwt = require('jsonwebtoken');
var rootRouter = require('./root');
var usersRouter = require('./users');
var authRouter = require('./auth');
// var reviewsRouter = require('./reviews');
var meRouter = require('./me');
const { AdminRoleMiddleware } = require('./AdminRoleMiddleware');

const privateKey = 'TODO-get it from somewhere';

const authMiddleware = async (req, res, next) => {
  try {
    if (req.headers.authorization === undefined) {
      return res.json({
        error: true,
        message: 'Authorization headers are not provided'
      });
    }
    var token = req.headers.authorization.split(' ')[1];
    var decoded = await jwt.verify(token, privateKey);
    req.loggedUser = decoded;
    next();
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
  app.use(
    '/',
    express.Router().get('/', (req, res) => {
      res.json({ server: 'Toptal Assignment', status: 'Working' });
    })
  );
  app.use('/root', rootRouter);
  app.use('/users', authMiddleware, AdminRoleMiddleware, usersRouter);
  // app.use('/reviews', authMiddleware, reviewsRouter);
  app.use('/auth', authRouter);
  app.use('/me', authMiddleware, meRouter);
};
