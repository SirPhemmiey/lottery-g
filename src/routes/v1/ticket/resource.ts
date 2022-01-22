import { Router } from "express";
import { injectService } from "../../../middlewares/serviceMidleware";
import { createTicket, getAllTickets, getTicketById, getTicketStatus, updateTicketLines } from "./controller";
import { validate } from "../../../middlewares/validationMiddleware";
import { createTicketSchema, updateTicketSchema } from "./schema";

const router = Router();

router.post('/ticket', validate(createTicketSchema), injectService, createTicket);

router.get('/ticket', injectService, getAllTickets);

router.get('/ticket/:ticket_id', injectService, getTicketById);

router.put('/ticket/:ticket_id',  validate(updateTicketSchema), injectService, updateTicketLines);

router.get('/ticket/:ticket_id', injectService, getTicketStatus);

export { router as ticketRoute };
