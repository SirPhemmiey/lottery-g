
/**
 *
 * Manual dependency injection was used here, but a dependency injection library like typedi could be used as normal practice
 */

import { LotteryService } from "./services/LotteryService/LotteryService";
import { TicketRepository } from "./services/LotteryService/TicketRepository";
import { TicketDaoMongo } from "./services/LotteryService/TicketDaoMongo";
import { TicketDao } from "./services/LotteryService/TicketDao";
import { getMongo } from "./clients/mongodb/mongo";
import { LineService } from "./services/LotteryService/LineService";

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
    ticketDao: TicketDao,
    ticketRepository: TicketRepository,
}

const createContainer = () => {
    const lineService = new LineService(3);
    const ticketRepository = new TicketRepository(lineService);
    const ticketDao = new TicketDaoMongo(getMongo());
    const lotteryService = new LotteryService(ticketRepository, ticketDao, 
        lineService);

    const container: ServiceContainer = {
       lotteryService,
       ticketDao,
       ticketRepository,
    }
    return container;
};


const service = createContainer();

//to use the service container anywhere else out of context (using the this keyword)
export const getService = () => {
    return service;
};
