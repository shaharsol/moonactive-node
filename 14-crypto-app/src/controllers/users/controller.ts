import { NextFunction, Request, Response } from "express";
import getModel from "../../models/user-symbols/factory";
import redis from "../../db/redis";
import config from 'config'

export async function dashboard(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = '09ac3c91-eeab-4388-b8e9-ecbaf3d96466'
        const userSymbols = await getModel().getPerUser(userId)

        const symbolKeyTemplate = config.get<string>('redis.symbolKeyTemplate')

        const result = await Promise.all(userSymbols.map(userSymbol => redis.lrange(`${symbolKeyTemplate}:${userSymbol.symbol}`, 0, 0)))
        const symbolValues = userSymbols.map((userSymbol, index) => ({
            symbol: userSymbol.symbol,
            value: result[index][0] ? JSON.parse(result[index][0]).value : 0
        }))

        res.render('users/dashboard', { userSymbols, symbolValues })
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