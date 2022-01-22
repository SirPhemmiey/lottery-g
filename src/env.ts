
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
  MONGO_URI: string,
}

export const getEnv = (): SetUpEnv => {
  return {
    PORT: process.env.PORT ?? '',
    NODE_ENV: process.env.NODE_ENV ?? '',
    MONGO_URI: process.env.MONGO_URI ?? '',
  }
}