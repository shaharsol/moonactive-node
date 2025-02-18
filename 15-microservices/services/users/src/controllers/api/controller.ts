import { NextFunction, Request, Response } from "express";
import getModel from "../../models/user-symbols/factory";

export async function getDistinctSymbols(req: Request, res: Response, next: NextFunction){
    try {
        const distinctSymbols = await getModel().getDistinctSymbols()
        res.json(distinctSymbols)
    } catch (e) {
        next(e)
    }
}