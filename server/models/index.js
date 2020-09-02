'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  if (config.dialect === 'sqlite') {
    sequelize = new Sequelize(
      {
        dialect: 'sqlite',
        storage: config.storage,
        logging: console.log
      }
      // {
      //   logging: console.log
      // }
      //   {
      //     // Choose one of the logging options
      //     logging: console.log, // Default, displays the first parameter of the log function call
      //     logging: (...msg) => console.log(msg), // Displays all log function call parameters
      //     logging: false, // Disables logging
      //     logging: (msg) => logger.debug(msg), // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
      //     logging: logger.debug.bind(logger) // Alternative way to use custom logger, displays all messages
      //   }
    );
  }
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//sequelize.sync({ force: true });

(async function main() {
  try {
    await db.sequelize.authenticate();
    console.log('DB Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
module.exports = db;

// const { Sequelize } = require('sequelize');

// // Option 2: Passing parameters separately (sqlite)
// const db = new Sequelize(
//   {
//     dialect: 'sqlite',
//     storage: './database.sqlite'
//   }
//   //   {
//   //     // Choose one of the logging options
//   //     logging: console.log, // Default, displays the first parameter of the log function call
//   //     logging: (...msg) => console.log(msg), // Displays all log function call parameters
//   //     logging: false, // Disables logging
//   //     logging: (msg) => logger.debug(msg), // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
//   //     logging: logger.debug.bind(logger) // Alternative way to use custom logger, displays all messages
//   //   }
// );
