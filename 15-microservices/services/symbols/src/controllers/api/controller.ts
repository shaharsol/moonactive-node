import { NextFunction, Request, Response } from "express";
import redis from "../../db/redis";
import config from 'config'
export async function getLatestValue(req: Request<{symbol: string}>, res: Response, next: NextFunction) {
    const symbolKeyTemplate = config.get<string>('redis.symbolKeyTemplate')
    const result = await redis.lrange(`${symbolKeyTemplate}:${req.params.symbol}`, 0, 0)
    res.json(JSON.parse(result[0]))
}