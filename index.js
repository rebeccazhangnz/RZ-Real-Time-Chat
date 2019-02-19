const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const server = app.listen(port,()=>{
    console.log('Server is listening on port', port)
})

app.use(express.static('public'))

//in order to create an websockets connection i have reuired a lib call socket.io, there are other lib like ws, ws-server etc. that can achieve the same thing. I choose socket.io is simply because there are more tutoiral on it. 
const serverSocket = require('socket.io')

//first we need to set up the socket, socket here is an function, it takes one parameter which is the server. What this does is to tell socket.io, we want websocket to work on this server. When there is a client calling this server, please setup a websocket connection between the client and server.
const webSocket = serverSocket(server)


//socket.id is the socket id of that unique connection. the id will keep the same during the connection and everytime you refresh the page, the socket id change, it is because when refresh, the connection disconnect and reconnect again, and whenever a new connection happedn an new socket is setup
webSocket.on('connection', (socket)=>{
    console.log('Setting up webSocket Connection',socket.id)
    socket.on('chat', function(data){
        webSocket.sockets.emit('chat',data)
    })

    socket.on('typing', function(user){
        socket.broadcast.emit('typing',user)
    })
})


