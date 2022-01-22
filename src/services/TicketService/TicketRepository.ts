
/**
 * This is a tickets related class. It wil handle every ticket activity
 */
 import { v4 as uuidv4 } from 'uuid';
import { Ticket, TicketStatus } from "./TicketDao";

export interface ITicketRepository {
    generateTicket(lines: number): Ticket;
}


export class TicketRepository implements ITicketRepository {

    generateTicket(lines: number) {
        const numberOfLines: number[] = new Array();
        for (let i = 0; i < lines; i++) {
            numberOfLines.push(i);
        }
        const ticket: Ticket = {
            id: uuidv4(),
            status: TicketStatus.NotChecked,
            lines: [{numbers: numberOfLines}]
          //  lines: [{lineNumbers: numberOfLines}],
        };
        return ticket;
    }
}