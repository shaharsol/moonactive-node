import axios from 'axios';
import * as cheerio from 'cheerio';
import config from 'config';
import redis from './db/redis';
import io from 'socket.io-client';
import SocketMessages from 'socket-messages-moon-shaharsol';

const socket = io(config.get<string>('worker.io.url'))

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
        socket.emit(SocketMessages.UpdateFromWorker, {
            symbol,
            value
        })
    }
}

async function work() {
    try {
        // in a monolith architecture, we could have directly acccess the database:
        // const symbolsToScrape = await getModel().getDistinctSymbols()
        // now, in a microservice architecture, we need to use API:
        const response = await axios.get<{symbol: string}[]>(`${config.get<string>('worker.app.url')}/api/distinct-symbols`)
        const symbolsToScrape = response.data
        await Promise.allSettled(symbolsToScrape.map(symbolToScrape => scrapeSymbol(symbolToScrape.symbol)))
        await sleep(config.get<number>('worker.interval'))
    } catch (e) {
        console.error(`error in worker`, e)
    } finally {
        work()
    }
}

work()
console.log('worker started...')


