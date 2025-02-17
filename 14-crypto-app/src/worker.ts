import config from 'config'
import getModel from './models/user-symbols/factory'
import axios from 'axios'
import * as cheerio from 'cheerio';
import redis from './db/redis';
import { EmitHint } from 'typescript';

function sleep(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}

async function scrapeSymbol(symbol: string) {
    const response = await axios.get<string>(`https://www.google.com/finance/quote/${symbol}-USD`)
    const html = response.data
    const $ = cheerio.load(html)
    const value = $('.YMlKec.fxKbKc').text()
    if (value) {
        const data = {
            value,
            when: (new Date()).toISOString()
        }
        await redis.lpush(`${config.get<string>('redis.symbolKeyTemplate')}:${symbol}`, JSON.stringify(data))
        console.log(`pushed to redis the value ${value} for ${symbol}`)
    }
}

async function work() {
    try {
        const symbolsToScrape = await getModel().getDistinctSymbols()
        await Promise.allSettled(symbolsToScrape.map(symbolToScrape => scrapeSymbol(symbolToScrape.symbol)))
        await sleep(config.get<number>('worker.interval'))
    } catch (e) {
        console.error(`error in worker`, e)
    } finally {
        work()
    }
}

work()


