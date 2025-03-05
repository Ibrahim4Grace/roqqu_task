import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const isProduction = process.env.NODE_ENV === 'production';

let dataSourceConfig: any;

if (isProduction) {
  const url = new URL(process.env.DATABASE_URL as string);

  dataSourceConfig = {
    type: 'postgres',
    host: url.hostname,
    port: Number(url.port) || 5432,
    username: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    synchronize: false,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
  };
} else {
  dataSourceConfig = {
    type: 'postgres',
    host: process.env.POSTGRESDB_HOST,
    port: Number(process.env.POSTGRESDB_PORT),
    username: process.env.POSTGRESDB_USER,
    password: process.env.POSTGRESDB_PASSWORD,
    database: process.env.POSTGRESDB_DATABASE,
    synchronize: false,
    logging: false,
    entities: ['src/entities/**/*.ts'],
    migrations: ['src/migrations/**/*.ts'],
  };
}
export const AppDataSource = new DataSource(dataSourceConfig);
