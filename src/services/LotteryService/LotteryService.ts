import { Ticket, TicketDao, TicketStatus } from "../TicketService/TicketDao";
import { ITicketRepository } from "../TicketService/TicketRepository";
import { ILineGenerator } from "./LineGenerator";

export class LotteryService {

    constructor(private ticketRepository: ITicketRepository, 
        private ticketDao: TicketDao,
        private lineGenerator: ILineGenerator) {}

    async createLotteryTicket(numberOfLines: number) {
        if (numberOfLines <= 0) {
            throw new Error('Invalid number of lines')
        }
        const ticket = this.ticketRepository.generateTicket(numberOfLines);
        await this.ticketDao.addTicket(ticket);
        return ticket;
    }

   async updateTicketLines(numberOfLines: number, ticketId: string) {
        //TODO: validate number of lines
        //TODO: validate ticket id
        if (numberOfLines <= 0) {
            throw new Error('Invalid number of lines')
        }
        const ticket = await this.ticketDao.getTicketById(ticketId);
       const updatedTicket = await this.checkAndUpdateTicket(numberOfLines, ticket);
       return updatedTicket;
    }

    async checkAndUpdateTicket(numberOfLines: number, ticket: Ticket) {
        let newLines: number[] = [];
        if (ticket.status === TicketStatus.NotChecked) {
            const existingTicketLine = ticket.lines;
            for (let i = 0; i < numberOfLines; i++) {
                newLines.push(this.lineGenerator.generateLine())
            }
            ticket.lines = [...existingTicketLine, {numbers: newLines}];
        } else {
            throw new Error('Ticket already checked so it cannot be amended');
        }
        await this.ticketDao.updateTicket(ticket.id, ticket);
        return ticket;
    }

    async checkTicketStatus(ticketId: string) {
        //TODO: validate that ticket id is valid and a string
        const ticket = await this.ticketDao.getTicketById(ticketId);
        ticket.status = TicketStatus.Checked;
        await this.ticketDao.updateTicket(ticketId, ticket);
        return ticket;
    }

    async getTicketStatus(ticketId: string) {
        //TODO: validate that ticket id is valid and a string
        const ticket = await this.ticketDao.getTicketById(ticketId);
        return ticket.status;
    }
}