/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

// const roles = require('nestjs-extra').Role;
// const notification = require('nestjs-extra').Notification;
const User = require('./src/users/user.entity').User;
const ContractJob = require('./src/reviews/review.entity').Review;
const Review = require('./src/contract-jobs/contract-job.entity').ContractJob;

const nodeEnv = process.env.NODE_ENV || '';
const envs = dotenv.config({ path: `${nodeEnv}.env` }).parsed;

// const entities = [roles, notification, ad, post, user, serviceAd, carPart];
const entities = [User, ContractJob, Review];

const config = {
  entities,
  type: 'mysql',
  // host: envs.DB_HOST,
  host: 'localhost',
  database: envs.DB_DATABASE,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  port: envs.DB_PORT,
  logging: 'error',
  synchronize: false,
  maxQueryExecutionTime: 3000,
  // charset: 'utf8_general_ci',
  namingStrategy: new SnakeNamingStrategy(),
  cache: {
    type: 'redis',
    options: {
      port: envs.REDIS_PORT,
      host: envs.REDIS_HOST,
      host: 'localhost',
    },
    duration: 30000,
  },
};

/* Production and development specific settings */
if (process.env.NODE_ENV === 'production') {
} else {
  // config.synchronize = true;
  config.logging = 'all';
  config.migrations = ['db/migrations/*{.ts,.js}'];
  // This is for migration
  // This is for webpack
  // config.entities = getMetadataArgsStorage().tables.map(tbl => tbl.target);
  // config.migrationsRun = true;
}

module.exports = config;
