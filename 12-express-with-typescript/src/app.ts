// const express = require('express')
import express, { NextFunction, Request, Response } from 'express'

function getUsers(req: Request, res: Response, next: NextFunction) {
    res.json({
        id: 2,
        name: 'yosi',
        age: 22
    })
}


const server = express()

server.use(getUsers)

server.listen(3001, () => console.log('server started on port 3001...'))