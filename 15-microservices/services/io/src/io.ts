import { Server } from "socket.io";
import config from 'config'
import SocketMessages from "socket-messages-moon-shaharsol";

const io = new Server({
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log('new connection...')

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