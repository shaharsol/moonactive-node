const { Router } = require('express')

const student = {
    id: 123,
    name: 'Moshe Ben Zaken',
    City: 'Raanana'
}

const connectToMysql = (req, res, next) => {
    console.log('connecting to mysql...')
    const connection = Math.random() > 0.5 ? 'MYSQL::CONNECTION' : 'MYSQL UNAVAILABLE'
    if (connection === 'MYSQL::CONNECTION') {
        req.connection = connection
        next()
    } else {
        next('could not connect to mysql')
    }
}

const getStudent = (req, res, next) => {
    // res.setHeader('Content-type', 'application/json')
    // res.end(JSON.stringify(student))
    console.log(`getting data from the databse using connection ${req.connection}`)
    res.json(student)
}

const addStudent = (req, res, next) => {
    res.end('adding a student to the database')
}

const sendWelcomeEmail = (req, res, next) => {
    console.log('sending welcome email')
    next()
}


const router = Router()

router.use(connectToMysql)
router.get('/', getStudent)
router.post('/', sendWelcomeEmail)
router.post('/', addStudent)

module.exports = router