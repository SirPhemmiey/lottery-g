
export interface LineNumber {
    numbers: number
}

export enum TicketStatus {
    Checked = 'checked',
    NotChecked = 'not-checked'
}

export interface LineNumbers {
    numbers: number[]
}

export interface Ticket {
   // id: string,
    lines: LineNumbers[],
    //lines: [{lineNumbers: number[]}],
    status: TicketStatus
}

export type TicketExtended = Ticket & {_id: string}

export interface TicketDao {
    addTicket(doc: Ticket): Promise<string>;
    getTicketById(id: string): Promise<TicketExtended>;
    getTickets(): Promise<TicketExtended[]>;
    updateTicket(id: string, doc: Ticket): Promise<string>;
    deleteAll(): Promise<void>;
}