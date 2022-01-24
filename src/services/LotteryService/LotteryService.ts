import { ILineService } from "./LineService";
import { LineNumbersValue, Ticket, TicketExtended, TicketStatus } from "./TicketDao";
import { ITicketRepository } from "./TicketRepository";

export class LotteryService {

    constructor(private ticketRepository: ITicketRepository, private lineService: ILineService) { }

    /**
     * @description - Create lottery ticket with `n` lines
     * @param {number} numberOfLines
     * @return {*} 
     * @memberof LotteryService
     */
    async createLotteryTicket(numberOfLines: number) {
        if (numberOfLines <= 0) throw new Error('Invalid number of lines');
        const generatedTicket = this.ticketRepository.generateTicket(numberOfLines);
        const ticket = await this.ticketRepository.addTicket(generatedTicket);
        return {
            id: ticket,
            ...generatedTicket,
        };
    }

    /**
     * @description - Update ticket lines with n lines
     * @param {number} numberOfLines
     * @param {string} ticketId
     * @return {*} 
     * @memberof LotteryService
     */
    async updateTicketLines(numberOfLines: number, ticketId: string) {
        const ticketExists = await this.ticketExists(ticketId);
        if (!ticketExists) throw new Error('Ticket does not exist');
        if (numberOfLines <= 0) throw new Error('Invalid number of lines');

        const ticket = await this.ticketRepository.getTicketById(ticketId);
        const updatedTicket = await this.checkAndUpdateTicket(numberOfLines, ticket);
        return updatedTicket;
    }

    /**
     * @description - A protected function to check and update ticket with n lines
     * @protected
     * @param {number} numberOfLines
     * @param {TicketExtended} ticket
     * @return {*}  {Promise<TicketExtended>}
     * @memberof LotteryService
     */
    protected async checkAndUpdateTicket(numberOfLines: number, ticket: TicketExtended): Promise<TicketExtended> {
        if (ticket.status === TicketStatus.NotChecked) {
            for (let i = 0; i < numberOfLines; i++) {
                ticket.lines.push({ numbers: [this.lineService.generateLine(), this.lineService.generateLine(), this.lineService.generateLine()] })
            }
        } else {
            throw new Error('You cannot amend ticket that has been checked already');
        }
        await this.ticketRepository.updateTicket(ticket._id, ticket);
        return ticket;
    }

    /**
     * @description - a protected function to calculate lottery lines outcome values
     * @protected
     * @param {Ticket} ticket
     * @return {*}  {Promise<LineNumbersValue[]>}
     * @memberof LotteryService
     */
    protected async calculateTicketLotteryValues(ticket: Ticket): Promise<LineNumbersValue[]> {
        return this.lineService.checkLineNumbers(ticket.lines);
    }
    /**
     * @description - Check ticket status
     * @param {string} ticketId
     * @return {*}  {Promise<{ticket_status: TicketStatus.Checked; lines: LineNumbersValue[];}>}
     * @memberof LotteryService
     */
    async checkTicketStatus(ticketId: string): Promise<{ ticket_status: TicketStatus.Checked; lines: LineNumbersValue[]; }> {
        const ticketExists = await this.ticketExists(ticketId);
        if (!ticketExists) throw new Error('Ticket does not exist');

        const ticket = await this.ticketRepository.getTicketById(ticketId);
        ticket.status = TicketStatus.Checked;
        await this.ticketRepository.updateTicket(ticketId, ticket);
        const results = await this.calculateTicketLotteryValues(ticket);
        return { ticket_status: ticket.status, lines: results, };
    }

    /**
     * @description - Get ticket information by ticket id
     * @param {string} ticketId
     * @return {*}  {Promise<TicketExtended>}
     * @memberof LotteryService
     */
    async getTicketById(ticketId: string): Promise<TicketExtended> {
        const ticketExists = await this.ticketExists(ticketId);
        if (!ticketExists) throw new Error('Ticket does not exist');
        const ticket = await this.ticketRepository.getTicketById(ticketId);
        return ticket;
    }

    /**
     * @description - Get all tickets
     * @return {*}  {Promise<TicketExtended[]>}
     * @memberof LotteryService
     */
    async getAllTickets(): Promise<TicketExtended[]> {
        return this.ticketRepository.getTickets();
    }


    /**
     * @description - A simple protected function to check if ticket exists or not
     * @protected
     * @param {string} ticketId
     * @return {*}  {Promise<boolean>}
     * @memberof LotteryService
     */
    protected async ticketExists(ticketId: string): Promise<boolean> {
        return this.ticketRepository.exists(ticketId);
    }

    async deleteAll() {
        return this.ticketRepository.deleteAll();
    }
}