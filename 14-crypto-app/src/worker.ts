import config from 'config'
import getModel from './models/user-symbols/factory'

function sleep(timeout: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout)
    })
}

async function scrapeSymbol(symbol: string) {

}

async function work() {
    try {
        const symbolsToScrape = await getModel().getDistinctSymbols()
        const result = await Promise.allSettled(symbolsToScrape.map(symbolToScrape => scrapeSymbol(symbolToScrape.symbol)))
        await sleep(config.get<number>('worker.interval'))
    } catch (e) {
        console.error(`error in worker`, e)
    } finally {
        work()
    }
}

work()


