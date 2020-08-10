var rootRouter = require('./root');
var usersRouter = require('./users');

module.exports = (app) => {
  console.log('Setting up Routes');
  app.use('/', rootRouter);
  app.use('/users', usersRouter);
};
