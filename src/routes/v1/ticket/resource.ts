import { Router } from "express";
import { injectService } from "../../../middlewares/serviceMidleware";
import { createTicket, getAllTickets, getTicketById, getTicketStatus, updateTicketLines } from "./controller";

const router = Router();

router.post('/ticket', injectService, createTicket);

router.get('/ticket', injectService, getAllTickets);

router.get('/ticket/:ticketId', injectService, getTicketById);

router.put('/ticket/:ticketId', injectService, updateTicketLines);

router.put('/ticket/:ticketId', injectService, getTicketStatus);

export { router as ticketRoute };
