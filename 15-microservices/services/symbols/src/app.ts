import express from 'express'
import config from 'config'
import apiRouter from './routers/api'

const port = config.get<number>('app.port')
const app = express()

app.use('/api', apiRouter)

app.listen(port, () => console.log(`symbols api started on ${port}`))