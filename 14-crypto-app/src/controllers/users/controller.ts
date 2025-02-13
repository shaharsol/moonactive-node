import { NextFunction, Request, Response } from "express";

export function dashboard(req: Request, res: Response, next: NextFunction) {
    res.render('users/dashboard')
}

export function addSymbol(req: Request, res: Response, next: NextFunction) {
    const { symbol } = req.body
    res.send(`adding symbol ${symbol}...`)
}