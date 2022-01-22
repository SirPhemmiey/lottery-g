
/**
 * This is a tickets related class. It wil handle every ticket activity
 */
import { LineNumbers, TicketStatus } from "./TicketDao";

export interface ITicketRepository {
    generateTicket(lines: number): {status: TicketStatus, lines: LineNumbers[]};
}


export class TicketRepository implements ITicketRepository {

    generateTicket(lines: number) {
        const numberOfLines: number[] = new Array();
        for (let i = 0; i < lines; i++) {
            numberOfLines.push(i);
            console.log({i})
        }
        const ticket = {
            status: TicketStatus.NotChecked,
            lines: [{numbers: numberOfLines}]
          //  lines: [{lineNumbers: numberOfLines}],
        };
        console.log({ticket});
        return ticket;
    }
}