import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { handlers } from './handlers';

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  handlers(socket, io);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
