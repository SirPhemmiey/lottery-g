
import { IRedis } from "../../redis/Redis";
import { Ticket, TicketDao, TicketStatus } from './TicketDao';

export class TicketDaoStore implements TicketDao {

    constructor(private store: IRedis) {}
    
    updateTicket(id: string, doc: Ticket): Promise<string> {
        throw new Error('Method not implemented.');
    }

    addTicket(doc: Ticket): Promise<string> {
        throw new Error('Method not implemented.');
    }
    getTicketById(id: string): Promise<Ticket> {
        //TODO: throw an exception if ticket id is not found
        throw new Error('Method not implemented.');
    }
    getTickets(): Promise<Ticket[]> {
        throw new Error('Method not implemented.');
    }
    getTicketStatus(id: string): TicketStatus {
        throw new Error('Method not implemented.');
    }
}