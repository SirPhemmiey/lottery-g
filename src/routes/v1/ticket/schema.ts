import Joi from 'joi';

export const createTicketSchema = Joi.object({
    number_of_lines: Joi.number().required(),
});

// export const getTicketSchema = Joi.object({
//     ticket_id: Joi.string()
// });

export const updateTicketSchema = Joi.object({
   // ticket_id: Joi.string(),
    number_of_lines: Joi.number().required(),
});