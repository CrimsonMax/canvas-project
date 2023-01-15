const express = require('express')
const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

const PORT = process.env.PORT || 5000

app.ws('/', (ws, reg) => {
  ws.on('message', (msg) => {
    msg = JSON.parse(msg)
    
    switch (msg.method) {
      case 'connection':
        connectionHandler(ws, msg)
        break
      case 'draw':
        broadcastConnection(ws, msg)
        break
    }
  })
})

app.listen(PORT, () => console.log(`server started on ${PORT}`))

const connectionHandler = (ws, msg) => {
  ws.id = msg.id
  broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
  aWss.clients.forEach(elem => {
    if (elem.id === msg.id) {
      elem.send(JSON.stringify(msg))
    }
  })
}