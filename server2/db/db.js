// connect to Mongo daemon
const mongoose = require('mongoose');
//const fs = require('fs');
require('dotenv').config();
/*
mongodb+srv://platformdbadmin:<password>@cluster0-n5anz.mongodb.net/test?retryWrites=true&w=majority

Shell mongo "mongodb+srv://cluster0-n5anz.mongodb.net/test" --username platformdbadmin
Compass mongodb+srv://platformdbadmin:<password>@cluster0-n5anz.mongodb.net/test


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://platformdbadmin:<password>@cluster0-n5anz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
const { logInfo, logError } = require('./log');
//console.log(process.env.MONGODB_URL);
//const prodDbUrl = process.env.MONGODB_URL;
module.exports = () => {
  let dburl = '';
  const { DEPLOY_ENV } = process.env;
  const { SP_DOCDB_PROD_MASTER_USERNAME, SP_DOCDB_PROD_MASTER_PASSWORD, SP_DOCDB_PROD_HOST } = process.env;
  let mongooseOptions;
  switch (DEPLOY_ENV) {
    case 'local':
      dburl = 'mongodb://admin:password@localhost:27017/plot';
      mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      };
      break;
    case 'prod':
      dburl = `mongodb+srv://${SP_DOCDB_PROD_MASTER_USERNAME}:${SP_DOCDB_PROD_MASTER_PASSWORD}@${SP_DOCDB_PROD_HOST}/ndvi?retryWrites=true&w=majority`;
      logInfo({ dburl });
      mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000
        // ssl: true,
        // sslValidate: false,
        // sslCA: fs.readFileSync(__dirname + '/rds-combined-ca-bundle.pem')
      };
      break;
    default:
      throw new Error('DEPLOY_ENV must be either local or prod, right now it is', DEPLOY_ENV);
  }
  return new Promise((resolve, reject) => {
    mongoose
      .connect(dburl, mongooseOptions)
      .then(() => logInfo('MongoDB Connected'))
      .then(() => resolve())
      .catch((err) => logError(err));
    var db = mongoose.connection;
    // fastify.addHook('onClose', function (fastify, done) {
    //     db.close(done)
    //   })
    db.on('error', () => {
      logError('DB connection error');
      reject();
    });
    db.once('open', function () {
      // we're connected!
      //TODO, load Model and Schema
      //resolve(db);
    });
  });
};
