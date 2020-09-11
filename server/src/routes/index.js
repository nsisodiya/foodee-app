var express = require('express');
var rootRouter = require('./root');
var usersRouter = require('./users');
var authRouter = require('./auth');
var restaurantRouter = require('./RestaurantRouter');
var reviewRouter = require('./ReviewRouter');

// var reviewsRouter = require('./reviews');
var apiRouter = require('./api');
const { adminRoleMiddleware, authMiddleware } = require('./middleware');

// function(req, res, next){
//   if (req.query.something) {
//     middlewareA(req, res, next);
//   } else {
//     middlewareB(req, res, next);
//   }
// }

module.exports = (app) => {
  console.log('Setting up Routes');
  app.use(
    '/',
    express.Router().get('/', (req, res) => {
      res.json({ server: 'Foodee', status: 'Working' });
    })
  );
  app.use('/root', rootRouter);
  app.use('/users', authMiddleware, adminRoleMiddleware, usersRouter);
  app.use('/restaurants', authMiddleware, restaurantRouter);
  //app.use('/restaurants/:id/reviews', authMiddleware, xyz.getAllReviewsForRestraurant); //
  //app.use('/restaurants/:id/withreviews', authMiddleware, xyz.getRestaurantDatawithRevies); //
  app.use('/reviews', authMiddleware, reviewRouter);
  app.use('/auth', authRouter);
  app.use('/api', authMiddleware, apiRouter);
};
