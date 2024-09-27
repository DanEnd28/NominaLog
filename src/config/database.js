import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  NODE_ENV = 'development',
} = process.env;

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  dialect: 'postgres',
  port: parseInt(POSTGRES_PORT, 10),
  logging: NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

export default sequelize;