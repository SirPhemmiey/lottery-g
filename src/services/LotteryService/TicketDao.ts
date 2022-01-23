
export enum TicketStatus {
    Checked = 'checked',
    NotChecked = 'not-checked'
}

export interface LineNumbers {
    numbers: number[]
}

export type LineNumbersValue = LineNumbers & {outcomeValue: number}

export interface Ticket {
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
    exists(id: string): Promise<boolean>;
}