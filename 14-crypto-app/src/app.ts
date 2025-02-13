import express, { NextFunction, Request, Response } from 'express'
import config from 'config'

// for config, there are two popular npm solutions
// dotenv
// node_config - we will use node_config
// const PORT = process.env.APP_PORT || 3000
const port = config.get<number>('app.port') 
const appName = config.get<string>('app.name')

const server = express()

server.listen(port, () => console.log(`${appName} started on port ${port}...`))

console.log(config.get<string>('app.awsPassword'))
