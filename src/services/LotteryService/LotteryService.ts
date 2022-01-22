import { ILineService } from "./LineService";
import { LineNumbersValue, Ticket, TicketDao, TicketExtended, TicketStatus } from "./TicketDao";
import { ITicketRepository } from "./TicketRepository";

export class LotteryService {

    constructor(private ticketRepository: ITicketRepository,
        private ticketDao: TicketDao,
        private lineService: ILineService) { }

    async createLotteryTicket(numberOfLines: number) {
        if (numberOfLines <= 0) {
            throw new Error('Invalid number of lines')
        }
        const ticket = this.ticketRepository.generateTicket(numberOfLines);
        await this.ticketDao.addTicket(ticket);
        return ticket;
    }

    async updateTicketLines(numberOfLines: number, ticketId: string) {
        if (numberOfLines <= 0) {
            throw new Error('Invalid number of lines')
        }
        const ticket = await this.ticketDao.getTicketById(ticketId);
        const updatedTicket = await this.checkAndUpdateTicket(numberOfLines, ticket);
        return updatedTicket;
    }

    //hide visibility: this should only be accessible by this class only
    protected async checkAndUpdateTicket(numberOfLines: number, ticket: TicketExtended) {
        if (ticket.status === TicketStatus.NotChecked) {
            for (let i = 0; i < numberOfLines; i++) {
                ticket.lines.push({numbers: [this.lineService.generateLine(), this.lineService.generateLine(), this.lineService.generateLine()]})
            }
        } else {
            throw new Error('Ticket already checked so it cannot be amended');
        }
        await this.ticketDao.updateTicket(ticket._id, ticket);
        return ticket;
    }

    protected async calculateTicketLotteryValues(ticket: Ticket): Promise<LineNumbersValue[]>{
        return this.lineService.checkLineNumbers(ticket.lines);
    }

    async checkTicketStatus(ticketId: string) {
        //TODO: validate that ticket id is valid and a string
        const ticket = await this.ticketDao.getTicketById(ticketId);
        ticket.status = TicketStatus.Checked;
        await this.ticketDao.updateTicket(ticketId, ticket);
        const results = this.calculateTicketLotteryValues(ticket);
        //change the ticket resuly there
        return results;
    }

    // async getTicketStatus(ticketId: string) {
    //     const ticket = await this.ticketDao.getTicketById(ticketId);
    //     return ticket.status;
    // }

    async getTicketById(ticketId: string) {
        const ticket = await this.ticketDao.getTicketById(ticketId);
        return ticket;
    }

    async getAllTickets() {
        return this.ticketDao.getTickets();
    }

    async deleteAll() {
        return this.ticketDao.deleteAll();
    }
}