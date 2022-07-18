const http = require('http')
const express = require('express')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
server.listen(5000, () => {
  console.log(`listening on http://localhost:5000`)
})

const io = new Server(server)

app.get('/', (req, res) => {
  console.log(__dirname)
  res.sendFile(__dirname + '/index.html')
})
io.on('connection', (socket) => {
  console.log('user connected')
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
