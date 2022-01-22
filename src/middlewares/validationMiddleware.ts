import { Request, Response, NextFunction } from 'express';
import Joi, { ValidationErrorItem } from 'joi';
import Boom from 'boom';
import { ResponseFormat } from '../core/ResponseFormat';
const response = new ResponseFormat();

const validate = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        const valid = error == null;
        if (valid) {
            next();
        } else {
            if (!error) {
                next();
            }
            const details: ValidationErrorItem[] = error.details;
            const message = details.map((i: ValidationErrorItem) => i.message).join(',');
            const { output } = Boom.badData(message);
            return response.handleError(res, output);
        }
    }
}

export { validate }