require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_DEV,
    host: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_TEST,
    host: process.env.HOST,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: process.env.PROD_DATABASE,
  },
};
