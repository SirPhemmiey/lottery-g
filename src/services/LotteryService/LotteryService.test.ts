
import { getService } from "../../di-container";

describe("POST /ticket/ticket", () => {

    it('should create a ticket', () => {
        //assertions
        //status shoiuld be not checked
        //number of lines sholuld be N

    });
});

describe("GET /ticket", () => {

    it('should get all tickets', () => {
        //asset number of tickets created
    });
});

describe("GET /ticket/:id", () => {

    it('should get ticket by id', () => {
        //status should be not checked
    });
});

describe("PUT /ticket/:id", () => {

    it('should amend ticket lines', () => {
        //status should be not checked
        //number of lines should increased by N

    });
});

describe("GET /status/:ticket_id", () => {

    it('should check status of a ticket', () => {
        //ticket status should be checked

    });

    it('should fail while trying to amend a checked ticket', () => {
        //should throw an error
    });
});