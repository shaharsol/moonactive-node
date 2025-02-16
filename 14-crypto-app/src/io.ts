import { Server } from "socket.io";
import config from 'config'
import SocketMessages from "./enums/socket-messages";

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
    socket.on(SocketMessages.UpdateFromWorker, (payload) => {
        console.log(`got update-from-worker, ${payload.symbol} is now ${payload.value}`)
        io.emit(SocketMessages.NewSymbolValue, payload)
    })
    
    socket.on('disconnect', () => {
        console.log('user diconnected...')
    })

})


const port = config.get<number>('io.port')
io.listen(port)
console.log(`io server started on port ${port}...`)