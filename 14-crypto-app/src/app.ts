import express, { NextFunction, Request, Response } from 'express'
import config from 'config'
import userRouter from './routers/users'
import path from 'path'

// for config, there are two popular npm solutions
// dotenv
// node_config - we will use node_config
// const PORT = process.env.APP_PORT || 3000
const port = config.get<number>('app.port') 
const appName = config.get<string>('app.name')

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.resolve(__dirname, 'views'))

server.use('/users', userRouter)

server.listen(port, () => console.log(`${appName} started on port ${port}...`))