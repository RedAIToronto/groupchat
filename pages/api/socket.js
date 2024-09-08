// pages/api/socket.js
import { Server } from 'socket.io'

const SocketHandler = (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server, {
            path: '/api/socket',
            addTrailingSlash: false,
        })
        res.socket.server.io = io

        io.on('connection', socket => {
            console.log('New client connected')
            socket.on('send-message', msg => {
                console.log('Message received:', msg)
                io.emit('receive-message', msg)
            })
            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })
    }
    res.end()
}

export default SocketHandler