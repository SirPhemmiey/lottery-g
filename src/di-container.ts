
/**
 *
 * Manual dependency injection was used here, but a dependency injection library like typedi could be used as normal practice
 */

import { getRedis, getRedisClient } from "./redis";
import { Redis } from "./redis/Redis";
import { LineGenerator } from "./services/LotteryService/LineGenerator";
import { LotteryService } from "./services/LotteryService/LotteryService";
import { TicketRepository } from "./services/TicketService/TicketRepository";
import { TicketDaoStore } from "./services/TicketService/TicketStore";

/**
 * this is going to be the base service where every other service or service container will inherit from
 * Things that can be put in the service here are configurable timezones, configurable currencies and other basic
 * configurations or settings that can be configurable and common to all "services/environments" etc
 */
export interface Service {
    //environment: ENV,
}

export interface ServiceContainer extends Service {
    lotteryService: LotteryService,
    ticketDaoStore: TicketDaoStore,
    ticketRepository: TicketRepository,
    redisService: Redis,
}

const createContainer = () => {
    const ticketRepository = new TicketRepository();
    const ticketDaoStore = new TicketDaoStore(getRedis());
    const lineGenerator = new LineGenerator(3);
    const lotteryService = new LotteryService(ticketRepository, ticketDaoStore, 
        lineGenerator);
    const redisService = new Redis(getRedisClient());

    const container: ServiceContainer = {
       lotteryService,
       ticketDaoStore,
       ticketRepository,
       redisService,
    }
    return container;
};


const service = createContainer();

//to use the service container anywhere else out of context (using the this keyword)
export const getService = () => {
    return service;
};
