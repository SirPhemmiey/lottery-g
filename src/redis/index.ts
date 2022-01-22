import * as redis from "redis";
import { getEnv } from '../env';
import { Redis } from './Redis';

// TODO: setup env, move params to env.
const client = redis.createClient({
    host: getEnv().REDIS_HOST,
    port: Number(getEnv().REDIS_PORT),
    auth_pass: getEnv().REDIS_PORT,
});

const redisClient = new Redis(client);

export const getRedisClient = () => client;

export const getRedis = () => redisClient;