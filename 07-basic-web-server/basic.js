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
    if (req.url === '/student') {
        if(req.method === 'GET') {
            res.setHeader('Content-type', 'application/json')
            res.end(JSON.stringify(student))
        }
    }
}

const server = createServer(requestHandler)
server.listen(3000, () => console.log('server started....'))