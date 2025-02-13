const express = require('express')
const studentRouter = require('./routers/student')

const gradesCsv = `
studentName,class,grade
Liron,Geography,96
Shira,History,98
Meron,Gym,66
`

const logRequest = (req, res, next) => {
    console.log(`a ${req.method} request for ${req.url} occured`)
    next()
}


const notFound = (req, res, next) => {
    // res.writeHead(404)
    // res.end('the page u requested was not found')
    res.status(404).send('the page u requested was not found')
}

const connectToRedis = (req, res, next) => {
    console.log('connecting to redis...')
    const connection = Math.random() > 0.5 ? 'REDIS::CONNECTION' : 'REDIS UNAVAILABLE'
    if (connection === 'REDIS::CONNECTION') {
        req.connection = connection
        next()
    } else {
        next('could not connect to redis')
    }
}

const addGrade = (req, res, next) => {
    res.end('adding a grade to the database')
}

const getGrades = (req, res, next) => {
    console.log(`getting data from the databse using connection ${req.connection}`)
    res.set('Content-type', 'text/csv')
    res.send(gradesCsv)
}

const pagerDuty = (err, req, res, next) => {
    console.log('sending pager duty...')
    next(err)
}

const errorLogger = (err, req, res, next) => {
    console.error(`there hasn been an error: ${err}`)
    next(err)
}

const errorResponder = (err, req, res, next) => {
    res.status(500).send(err)
}


const server = express()
//

// middleware loading logic:
// server.{method}('path', middleware)
// the condition to run the middleware is 
// a combination of method and path
server.use(logRequest)


server.use('/student', studentRouter)

server.use('/grades', connectToRedis)
server.get('/grades', getGrades)
server.post('/grades', addGrade)

// special middlware for not found
server.use(notFound)

// error middelwares, add those on the end of the chain
server.use('/grades', pagerDuty)
server.use(errorLogger)
server.use(errorResponder)

server.listen(3000, () => console.log('server started...'))