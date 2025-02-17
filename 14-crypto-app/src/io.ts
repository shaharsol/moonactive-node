import { Server } from "socket.io";
import config from 'config'

const io = new Server({
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log('new connection...')

    // socket.emit('welcome', {
    //     when: new Date()
    // })

    // io.emit('new-user', {
    //     when: new Date()
    // })
    socket.on('update-from-worker', (payload) => {
        io.emit('new-symbol-value', payload)
    })
    
    socket.on('disconnect', () => {
        console.log('user diconnected...')
    })

})


const port = config.get<number>('io.port')
io.listen(port)
console.log(`io server started on port ${port}...`)