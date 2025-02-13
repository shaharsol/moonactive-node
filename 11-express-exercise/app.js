const express = require('express')
const { toXML } = require('jstoxml');

const getUsers = async (req, res, next) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    req.data = users
    next()
}

const filterData = (req, res, next) => {
    const users = req.data
    const { search } = req.query
    const filterredUsers = search ? users.filter(user => user.username.includes(search)) : users
    req.data = filterredUsers
    next()
}

const respond = (req, res, next) => {
    const { format } = req.query
    if (format && format.toLowerCase() === 'xml') {
        res.set('Content-type', 'text/xml')
        res.send(toXML(req.data))
    } else {
        res.json(req.data)
    }
}
    
const app = express()

app.get('/users', getUsers, filterData, respond)
// app.get('/users', filterData)
// app.get('/users', respond)

app.listen(3000, () => console.log('started...'))