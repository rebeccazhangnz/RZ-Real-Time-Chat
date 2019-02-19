const express = require('express')
const app = express()
const port = process.env.PORT || 3000
server = app.listen(port,()=>{
    console.log('Server is listening on port', port)
})

app.use(express.static('public'))


//in order to create an websockets connection i have reuired a lib call socket.io, there are other lib like ws, ws-server etc. that can achieve the same thing. I choose socket.io is simply because there are more tutoiral on it. 
const serverSocket = require('socket.io')

//first we need to set up the socket, socket here is an function, it takes one parameter which is the server. What this does is to tell socket.io, we want websocket to work on this server. When there is a client calling this server, please setup a websocket connection between the client and server.
const io = serverSocket(server)

io.on('connection', (clientSocket)=>{
    console.log('made socket connection',clientSocket.id)
    })

