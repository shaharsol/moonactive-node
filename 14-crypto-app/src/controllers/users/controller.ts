import { NextFunction, Request, Response } from "express";
import getModel from "../../models/user-symbols/factory";

export async function dashboard(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = '09ac3c91-eeab-4388-b8e9-ecbaf3d96466'
        const userSymbols = await getModel().getPerUser(userId)
        res.render('users/dashboard', { userSymbols })
    } catch (e) {
        next(e)
    }
}

export async function addSymbol(req: Request, res: Response, next: NextFunction) {
    try {
        const { symbol } = req.body
        const userId = '09ac3c91-eeab-4388-b8e9-ecbaf3d96466'
    
        await getModel().add({ symbol, userId })
    
        res.redirect('/users/dashboard')
    } catch (e) {
        next(e)
    }
}