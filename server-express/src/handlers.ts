import { Socket } from "socket.io";

type PomoState = {
  running: boolean;
  state: 'Pomodoro' | 'Short Break' | 'Long Break';
  rounds: number;
}

type Timers = {
  [key: string]: {
    endMillis: number;
    state: PomoState;
  };
};

const activeTimers: Timers = {};

export const handlers = (socket: Socket, io: any) => {

  socket.on("create", (room: string) => {
    if (room in activeTimers) return;

    socket.join(room);
    activeTimers[room] = {
      endMillis: Date.now(),
      state: {
        running: false,
        state: 'Pomodoro',
        rounds: 2,
      }
    };
  });

  socket.on("join", (room: string) => {
    if (!(room in activeTimers)) return;

    socket.join(room);
  });

  socket.on("start-timer", (time: number) => {
    console.log('start-timer Received');
    if (socket.rooms.size != 2) {
      socket.emit('error', 'rooms');
      console.log(`${socket.id} must be in exactly one room excluding itself. Got ${socket.rooms.size}`);
      return;
    }

    for (let room of socket.rooms) {
      if (room == socket.id) continue;
      if (activeTimers[room].state.running) continue;

      socket.broadcast.to(room).emit('start-timer', time);
      console.log(`${socket.id} has started the timer in ${room}`);
      activeTimers[room].state.running = true;
    }
  });

  socket.on("stop-timer", (roomId: string, timestamp: string) => {
    console.log('stop-timer Received');
    if (socket.rooms.size != 2) {
      socket.emit('error', 'rooms');
      console.log(`${socket.id} must be in exactly one room excluding itself`);
      return;
    }

    for (let room of socket.rooms) {
      if (room == socket.id) continue;
      if (!activeTimers[room].state.running) continue;

      socket.broadcast.to(room).emit('stop-timer');
      console.log(`${socket.id} has stopped the timer in ${room}`);
      activeTimers[room].state.running = false;
    }
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", { userId: socket.id });
  });
};
