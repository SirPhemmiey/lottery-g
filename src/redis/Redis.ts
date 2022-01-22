import * as redis from "redis";

export interface IRedis {
    get<T>(key: string): Promise<T | null>;
    set<T>(key: string, val: T): Promise<void>;
}

export class Redis implements IRedis {

    constructor(private client: redis.RedisClient) {}
    
    stringify(val: any) {
        return JSON.stringify(val, (key, value) => {
            return value;
        });
    }

    parse(val: string) {
        return JSON.parse(val);
    }

    get<T>(key: string) {
        return new Promise<T | null>((resolve, reject) => {
            this.client.get(key, (err: any, val: string) => {
                if (err) {
                    throw err;
                }
                if(val) {
                    resolve(this.parse(val));
                } else {
                    resolve(null);
                }
            })
        });
    }

    set<T>(key: string, val: T) {
        return new Promise<void>((resolve, reject) => {
            this.client.set(key, this.stringify(val), (err: any) => {
                if (err) {
                    throw err;
                }
                resolve();
            });
        });
    }

}