import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

export default function validateBody(validator: ObjectSchema) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            req.body = await validator.validateAsync(req.body)
            next()
        } catch (e) {
            next({
                statusCode: 422,
                message: e
            })
        }
    }
}

