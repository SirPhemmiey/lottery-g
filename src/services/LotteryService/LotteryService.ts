import { ILineService } from "./LineService";
import { LineNumbersValue, Ticket, TicketDao, TicketExtended, TicketStatus } from "./TicketDao";
import { ITicketRepository } from "./TicketRepository";

export class LotteryService {

    constructor(private ticketRepository: ITicketRepository, private ticketDao: TicketDao, private lineService: ILineService) { }

    async createLotteryTicket(numberOfLines: number) {
        if (numberOfLines <= 0) {
            throw new Error('Invalid number of lines')
        }
        const generatedTicket = this.ticketRepository.generateTicket(numberOfLines);
        const ticket = await this.ticketDao.addTicket(generatedTicket);
        return {
            id: ticket,
            ...generatedTicket,
        };
    }

    async updateTicketLines(numberOfLines: number, ticketId: string) {
        const ticketExists = await this.ticketExists(ticketId);
        if (!ticketExists) throw new Error('Ticket does not exist');
        if (numberOfLines <= 0) throw new Error('Invalid number of lines');
        
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
            throw new Error('You cannot amend ticket that has been checked already');
        }
        await this.ticketDao.updateTicket(ticket._id, ticket);
        return ticket;
    }

    protected async calculateTicketLotteryValues(ticket: Ticket): Promise<LineNumbersValue[]>{
        return this.lineService.checkLineNumbers(ticket.lines);
    }

    async checkTicketStatus(ticketId: string) {
        const ticketExists = await this.ticketExists(ticketId);
        if (!ticketExists) throw new Error('Ticket does not exist');

        const ticket = await this.ticketDao.getTicketById(ticketId);
        ticket.status = TicketStatus.Checked;
        await this.ticketDao.updateTicket(ticketId, ticket);
        const results = await this.calculateTicketLotteryValues(ticket);
        return {ticket_status: ticket.status, lines: results, };
    }

    async getTicketById(ticketId: string) {
        const ticketExists = await this.ticketExists(ticketId);
        if (!ticketExists) throw new Error('Ticket does not exist');
        const ticket = await this.ticketDao.getTicketById(ticketId);
        return ticket;
    }

    async getAllTickets() {
        return this.ticketDao.getTickets();
    }

    async deleteAll() {
        return this.ticketDao.deleteAll();
    }

    protected async ticketExists(ticketId: string) {
        return this.ticketDao.exists(ticketId);
    }
}