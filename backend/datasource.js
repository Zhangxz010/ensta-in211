import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: ['entities/*.js'],
  ssl: {
    rejectUnauthorized: false,
  },
});
