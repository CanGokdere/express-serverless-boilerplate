import { Container } from 'typedi';
import { Sequelize } from 'sequelize';
import config from '../config';
require('dotenv').config();

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  dialect: 'mysql',
  logging: false,
  port: Number(process.env.PORT),
});

Container.set('database', sequelize);

export { Sequelize, sequelize };
