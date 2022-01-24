

import { ILineService } from "./LineService";
import { LineNumbers, Ticket, TicketDao, TicketExtended, TicketStatus } from "./TicketDao";

export interface ITicketRepository {
    generateTicket(lines: number): {status: TicketStatus, lines: LineNumbers[]};
    addTicket(doc: Ticket): Promise<string>;
    getTicketById(ticketId: string): Promise<TicketExtended>;
    getTickets(): Promise<TicketExtended[]>;
    deleteAll(): Promise<void>;
    updateTicket(id: string, doc: Ticket): Promise<string>;
    exists(id: string): Promise<boolean>
}


export class TicketRepository implements ITicketRepository {

    constructor(private ticketDao: TicketDao, private lineService: ILineService) {}

    generateTicket(lines: number) {
        let ticket: any = {
            status: TicketStatus.NotChecked,
            lines: [],
        };
        for (let i = 0; i < lines; i++) {
            ticket.lines.push({numbers: [this.lineService.generateLine(), this.lineService.generateLine(), this.lineService.generateLine()]})
        }
        return ticket;
    }

    async addTicket(doc: Ticket) {
        const ticket = await this.ticketDao.addTicket(doc);
        return ticket;
    }

    async getTicketById(ticketId: string): Promise<TicketExtended> {
        const ticket = await this.ticketDao.getTicketById(ticketId);
        return ticket;
    }

    getTickets(): Promise<TicketExtended[]> {
        const tickets =  this.ticketDao.getTickets();
        return tickets;
    }

    async updateTicket(ticketId: string, doc: Ticket): Promise<string> {
        await this.ticketDao.updateTicket(ticketId, doc);
        return ticketId;
    }

    deleteAll(): Promise<void> {
        return this.ticketDao.deleteAll();
    }

    exists(id: string): Promise<boolean> {
        return this.ticketDao.exists(id);
    }
}