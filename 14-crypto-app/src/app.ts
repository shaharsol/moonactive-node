import express, { NextFunction, Request, Response } from 'express'
import config from 'config'
import userRouter from './routers/users'
import path from 'path'
import errorLogger from './middlewares/error/error-logger'
import errorResponder from './middlewares/error/error-responder'
import notFound from './middlewares/not-found'
import githubRouter from './routers/github'
import githubAuth from './middlewares/github-auth'
import session from 'express-session'
import guestsRouter from './routers/guests'

// for config, there are two popular npm solutions
// dotenv
// node_config - we will use node_config
// const PORT = process.env.APP_PORT || 3000
const port = config.get<number>('app.port') 
const appName = config.get<string>('app.name')

const server = express()

server.set('view engine', 'ejs')
server.set('views', path.resolve(__dirname, 'views'))

// middlewares
// passport requires 3 things:
// 1. the use of express session
// 2. specific auth middleware initialize
// 3. specific auth middleware session
server.use(session({
    secret: config.get<string>('app.cookieSecret'),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
server.use(githubAuth.initialize())
server.use(githubAuth.session())

// routing
server.use('/users', userRouter)
server.use('/github', githubRouter)
server.use('/guests', guestsRouter)

// special 404 middleware
server.use(notFound)

// error middlewares
server.use(errorLogger)
server.use(errorResponder)

server.listen(port, () => console.log(`${appName} started on port ${port}...`))