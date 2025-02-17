import { NextFunction, Request, Response } from "express";

export default function enforeAuth(req: Request, res: Response, next: NextFunction) {
    if (req.user) next()
    else next({
        status: 401, 
        message: 'Go away you thief'
    })    
}
