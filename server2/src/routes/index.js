var express = require('express');
var rootRouter = require('./root');
var usersRouter = require('./users');
var authRouter = require('./auth');
var restaurantRouter = require('./RestaurantRouter');
var reviewRouter = require('./ReviewRouter');

// var reviewsRouter = require('./reviews');
var apiRouter = require('./api');
const { adminRoleMiddleware, authMiddleware } = require('./middleware');

module.exports = (app) => {
  console.log('Setting up Routes');
  app.use(
    '/',
    express.Router().get('/', (req, res) => {
      res.json({ server: 'Toptal Assignment', status: 'Working' });
    })
  );
  app.use('/root', rootRouter);
  app.use('/users', authMiddleware, adminRoleMiddleware, usersRouter);
  app.use('/restaurants', authMiddleware, adminRoleMiddleware, restaurantRouter);
  app.use('/reviews', authMiddleware, adminRoleMiddleware, reviewRouter);
  // app.use('/reviews', authMiddleware, reviewsRouter);
  app.use('/auth', authRouter);
  app.use('/api', authMiddleware, apiRouter);
};
