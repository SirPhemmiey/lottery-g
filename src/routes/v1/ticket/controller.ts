import { Response, Request} from 'express';
import { ServiceContainer } from '../../../di-container';
import { ResponseFormat } from '../../../core/ResponseFormat';
import { messages } from '../../../utils/constants';
import statusCode from 'http-status-codes';
import Boom from 'boom';

const response = new ResponseFormat();

export const createTicket = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    const lines = req.body.numberOfLines as number;
    return base.lotteryService.createLotteryTicket(lines).then((ticket) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: ticket,
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const getAllTickets = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.lotteryService.getAllTickets().then((tickets) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: tickets,
        });
    })
    .catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const getTicketById = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.lotteryService.getTicketById(req.body.ticketId).then((ticket) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: ticket
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const updateTicketLines = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    const body = req.body as {numberOfLines: number, ticketId: string}
    return base.lotteryService.updateTicketLines(body.numberOfLines, body.ticketId).then((updatedTicket) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: updatedTicket,
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const getTicketStatus = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.lotteryService.getTicketStatus(req.body.ticketId).then((status) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: status,
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};