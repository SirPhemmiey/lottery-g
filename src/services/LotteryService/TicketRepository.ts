
/**
 * This is a tickets related class. It wil handle every ticket activity
 */
import { ILineService } from "./LineService";
import { LineNumbers, TicketStatus } from "./TicketDao";

export interface ITicketRepository {
    generateTicket(lines: number): {status: TicketStatus, lines: LineNumbers[]};
}


export class TicketRepository implements ITicketRepository {

    constructor(private lineService: ILineService) {}

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
}