import Ws from '#services/ws'
import app from '@adonisjs/core/services/app'

app.ready(() => {
  Ws.boot()
  const io = Ws.io
  io?.on('connection', (socket) => {
    socket.emit('ping', 'pong')
    socket.on('yert', () => {
      console.log(`received a yert from ${socket.id}`)
    })
  })
})
