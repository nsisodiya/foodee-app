var rootRouter = require('./root');
var usersRouter = require('./users');
var authRouter = require('./auth');

module.exports = (app) => {
  console.log('Setting up Routes');
  app.use('/', rootRouter);
  app.use('/users', usersRouter);
  app.use('/auth', authRouter);
};
