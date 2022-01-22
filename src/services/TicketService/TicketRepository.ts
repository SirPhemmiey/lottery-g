
/**
 * This is a tickets related class. It wil handle every ticket activity
 */
import { ILineGenerator } from "../LotteryService/LineGenerator";
import { LineNumbers, TicketStatus } from "./TicketDao";

export interface ITicketRepository {
    generateTicket(lines: number): {status: TicketStatus, lines: LineNumbers[]};
}


export class TicketRepository implements ITicketRepository {

    constructor(private lineGenerator: ILineGenerator) {}

    generateTicket(lines: number) {
        let ticket: any = {
            status: TicketStatus.NotChecked,
            lines: [],
        };
        for (let i = 0; i < lines; i++) {
            ticket.lines.push({numbers: [this.lineGenerator.generateLine(), this.lineGenerator.generateLine(), this.lineGenerator.generateLine()]})
        }
        return ticket;
    }
}