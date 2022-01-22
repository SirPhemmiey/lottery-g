
/**
 *
 * Manual dependency injection was used here, but a dependency injection library like typedi could be used as normal practice
 */

import { LineGenerator } from "./services/LotteryService/LineGenerator";
import { LotteryService } from "./services/LotteryService/LotteryService";
import { TicketRepository } from "./services/TicketService/TicketRepository";
import { TicketDaoMongo } from "./services/TicketService/TicketDaoMongo";
import { TicketDao } from "./services/TicketService/TicketDao";
import { getMongo } from "./clients/mongodb/mongo";

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
    const ticketRepository = new TicketRepository();
    const ticketDao = new TicketDaoMongo(getMongo());
    const lineGenerator = new LineGenerator(3);
    const lotteryService = new LotteryService(ticketRepository, ticketDao, 
        lineGenerator);

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
