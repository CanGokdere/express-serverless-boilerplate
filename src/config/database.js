require('dotenv').config();

const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'mysql',
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'MYSQL_URL',
    dialect: 'mysql',
  },
};
