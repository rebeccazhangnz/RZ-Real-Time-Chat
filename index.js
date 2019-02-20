const express = require('express')
const app = express()
app.use(express.static('public'))
const port = process.env.PORT || 3000

const server = app.listen(port,()=>{
    console.log('Server is listening on port', port)
})



//setting up WebSocket at server side
const webSocket = require('socket.io')
const serverSocket = webSocket(server)


//listen and response to the lient
serverSocket.on('connection', (socket)=>{
    console.log('Setting up webSocket Connection',socket.id)

    socket.on('chat', function(data){
        serverSocket.sockets.emit('chat',data)
    })

    socket.on('typing', function(user){
        socket.broadcast.emit('typing',user)
    })
})


