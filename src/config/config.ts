const env = process.env.NODE_ENV || 'dev';

const envs = {
  dev: '.env',
  e2e: '.env.e2e'
};

const options: { path: string } = {
  path: env === 'e2e' ? envs.e2e : envs.dev
};

import dotenv from 'dotenv';
dotenv.config(options);

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY || ''
  // dbUrl: process.env.DB_CNN || '',
  // jwtSecret: process.env.JWT_SECRET || 'simple secret'
};

export { config };
