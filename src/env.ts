
import * as dotenv from 'dotenv';

dotenv.config({path: `.env.${process.env.NODE_ENV}`, debug: true});
//require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
console.log(`currently using ${process.env.NODE_ENV} env`);


export enum ENV {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export interface SetUpEnv {
  PORT: string,
  NODE_ENV: string,
  REDIS_HOST: string,
  REDIS_PORT: string,
  REDIS_PASSWORD: string,
}

export const getEnv = (): SetUpEnv => {
  return {
    PORT: process.env.PORT ?? '',
    NODE_ENV: process.env.NODE_ENV ?? '',
    REDIS_PORT: process.env.REDIS_PORT ?? '',
    REDIS_HOST: process.env.REDIS_HOST ?? '',
    REDIS_PASSWORD: process.env.REDIS_PASSWORD ?? '',
  }
}