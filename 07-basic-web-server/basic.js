const e = require('express')
const { createServer } = require('http')

const student = {
    id: 123,
    name: 'Moshe Ben Zaken',
    City: 'Raanana'
}

const gradesCsv = `
studentName,class,grade
Liron,Geography,96
Shira,History,98
Meron,Gym,66
`

const requestHandler = (req, res) => {
    console.log(`a ${req.method} request for ${req.url} occured`)
    switch (req.url) {
        case '/student': 
            console.log('connecting to mysql...')
            switch (req.method) {
                case 'GET':
                    res.setHeader('Content-type', 'application/json')
                    res.end(JSON.stringify(student))
                    break;
                case 'POST':
                    res.end('adding a student to the database')
                    break;
                default:
                    res.writeHead(404)
                    res.end('the page u requested was not found')
            }
            break;
        case '/grades':
            console.log('connecting to redis...')
            switch (req.method) {
                case 'GET':
                    res.setHeader('Content-type', 'text/csv')
                    res.end(gradesCsv)
                    break;
                case 'POST':
                    res.end('adding a grade to the database')
                    break;
                default:
                    res.writeHead(404)
                    res.end('the page u requested was not found')
            }
            break;
        default:
            res.writeHead(404)
            res.end('the page u requested was not found')
    }
}

const server = createServer(requestHandler)
server.listen(3000, () => console.log('server started....'))