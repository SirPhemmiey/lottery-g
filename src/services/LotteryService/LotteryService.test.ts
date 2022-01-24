
import { getService } from "../../di-container";
import { TicketStatus } from "./TicketDao";

const service = getService();

beforeAll(async () => {
    await service.lotteryService.deleteAll();
}, 1000);

describe("POST /ticket", () => {

    it('should create a lottery ticket', async () => {
        const n = 2;
        const response = await service.lotteryService.createLotteryTicket(n);
        expect(response.status).toBe(TicketStatus.NotChecked);
        expect(response).toBeDefined();
        expect(response.id).toBeTruthy();
        expect(response.lines.length).toBe(n);
    });

    it('should throw an error if number of lines <=0 is passed to create a ticket', async () => {
        const n1 = 0; const n2 = -1;
        expect(async () => {
            await service.lotteryService.createLotteryTicket(n1)
        }).rejects.toThrow("Invalid number of lines");

        expect(async () => {
            await service.lotteryService.createLotteryTicket(n2)
        }).rejects.toThrow("Invalid number of lines");
    });
});

describe("GET /ticket", () => {

    it('should get all tickets', async () => {
        const tickets = await service.lotteryService.getAllTickets();
        expect(tickets.length).toBe(1);
    });
});

describe("GET /ticket/:id", () => {

    it('should get ticket by id', async () => {
        const n = 1;
        const response = await service.lotteryService.createLotteryTicket(n);
        const ticket = await service.lotteryService.getTicketById(response.id);
        expect(ticket._id).toBeDefined();
        expect(ticket.status).toBeTruthy();
        expect(ticket.status).toBe(TicketStatus.NotChecked);
    });
});

describe("PUT /ticket/:id", () => {

    it('should amend ticket lines', async () => {
        const n = 5;
        const response = await service.lotteryService.createLotteryTicket(n);
        expect(response).toBeDefined();

        const updatedTicket = await service.lotteryService.updateTicketLines(n, response.id);
        expect(updatedTicket.lines.length).toBe(n+n);
    });

    it('should fail while trying to amend a checked ticket', async () => {
        const n = 5;
        const response = await service.lotteryService.createLotteryTicket(n);
        expect(response).toBeDefined();
        expect(response.id).toBeTruthy();

        const updatedTicket = await service.lotteryService.updateTicketLines(n, response.id);
        expect(updatedTicket.lines.length).toBe(n+n);

        const checkedTicket = await service.lotteryService.checkTicketStatus(response.id);
        expect(checkedTicket.ticket_status).toBe(TicketStatus.Checked);

        expect(async () => {
            await service.lotteryService.updateTicketLines(n, response.id)
        }).rejects.toThrow("You cannot amend ticket that has been checked already"); 
    });
});

describe("GET /status/:ticket_id", () => {

    it('should check status of a ticket', async () => {
        const n = 3;
        const response = await service.lotteryService.createLotteryTicket(n);
        const checkedTicket = await service.lotteryService.checkTicketStatus(response.id);
        expect(checkedTicket.ticket_status).toBe(TicketStatus.Checked);
        expect(checkedTicket.lines.length).toBe(n);
    });

    it('should verify that outcome values are returned when ticket is checked', async () => {
        const n = 3;
        const response = await service.lotteryService.createLotteryTicket(n);
        const checkedTicket = await service.lotteryService.checkTicketStatus(response.id);
        expect(checkedTicket.ticket_status).toBe(TicketStatus.Checked);
        expect(checkedTicket.lines.length).toBe(n);

        expect(checkedTicket.lines[0].outcomeValue).toBeDefined();
        expect(checkedTicket.lines[1].outcomeValue).toBeDefined();
        expect(checkedTicket.lines[2].outcomeValue).toBeDefined();

        const number1Array = checkedTicket.lines[0].numbers;
        const number2Array = checkedTicket.lines[1].numbers;
        const number3Array = checkedTicket.lines[2].numbers;

        const number1Sum = number1Array.reduce((sum, value) => sum + value);

       // console.log({number1Array, outcomeValue1: checkedTicket.lines[0].outcomeValue})
        if (number1Sum === 2) {
            expect(checkedTicket.lines[0].outcomeValue).toBe(10);
        }
        if (number1Array[0] === number1Array[1] && number1Array[1] === number1Array[2]) {
            expect(checkedTicket.lines[0].outcomeValue).toBe(5);
        } else if (number1Array[1] !== number1Array[0] && number1Array[2] !== number1Array[0]) {
          //  expect(checkedTicket.lines[0].outcomeValue).toBe(1); number1Array: [ 0, 1, 1 ]
        } else {
           // expect(checkedTicket.lines[0].outcomeValue).toBe(0);
        }
    });

});