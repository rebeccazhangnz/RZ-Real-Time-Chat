//Set up client connection, when client makes a connect to the server, sets up an websocket connection
const clientSocket = io.connect('http://localhost:3000')


//Getting Elements from DOM

const message = document.getElementById('message')
const username = document.getElementById('username')
const sendBtn  = document.getElementById('sendBtn')
const output = document.getElementById('output')
const inputMonitor = document.getElementById('changeMonitor')
const clearBtn = document.getElementById('clearBtn')


//Emit events to server

sendBtn.addEventListener('click', ()=>{
    clientSocket.emit('chat', {
        message: message.value,
        username: username.value
    })
})

message.addEventListener('keypress', ()=>{
    clientSocket.emit('typing', username.value)
})

//Listen events from server

clientSocket.on('chat', (data)=>{
    output.innerHTML += `<p><strong> ${data.username} : &nbsp </strong><span> ${data.message} </span></p>`
    inputMonitor.innerHTML = ""
    message.value = ""
})

clientSocket.on('typing',(user)=>{
    inputMonitor.innerHTML = `<p><em>${user} is typing a message...</em></p>`
    setTimeout(()=>{inputMonitor.innerHTML = ''},1000)
})