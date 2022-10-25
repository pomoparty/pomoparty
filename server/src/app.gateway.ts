import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

type Timer = {
  [key: string]: {
    interval: NodeJS.Timer;
    currMillis: number;
    endMillis: number;
    paused: boolean;
  };
};

@WebSocketGateway({
  cors: true,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  private activeTimers: Timer = {};

  @WebSocketServer()
  private server: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    if (Object.prototype.hasOwnProperty.call(this.activeTimers, room)) {
      client.emit(
        'startTimer',
        this.activeTimers[room].endMillis - this.activeTimers[room].currMillis,
      );
    }
  }

  @SubscribeMessage('startTimer')
  handleMessage(client: Socket, durationMillis: number) {
    // Cast number to number because postman still sends payload as string
    durationMillis = Number(durationMillis);

    this.logger.log('startTimer Received');
    if (client.rooms.size != 2) {
      client.emit('error', 'rooms');
      this.logger.log(
        `${client.id} must be in exactly one room excluding itself`,
      );
      return;
    }
    const startTimeMillis: number = Date.now();

    const endTimeMillis: number = startTimeMillis + durationMillis;
    for (let room of client.rooms) {
      if (room == client.id) continue;
      this.logger.log(room);
      this.server.to(room).emit('startTimer', durationMillis);
      this.logger.log(
        `${client.id} has started the timer in ${room} for ${durationMillis} milliseconds`,
      );
      let interval = setInterval(() => {
        const paused = this.activeTimers[room].paused;
        if (!paused) {
          const currMillis = Date.now();
          this.server.to(room).emit('updateTimer', endTimeMillis - currMillis);
          this.activeTimers[room].currMillis = currMillis;
          if (endTimeMillis - currMillis <= 0) {
            this.logger.log('timer stopped');
            clearInterval(this.activeTimers[room].interval);
            delete this.activeTimers[room];
          }
        }
      }, 10); // tick every 100th of a second
      this.activeTimers[room] = {
        interval: interval,
        currMillis: startTimeMillis,
        endMillis: endTimeMillis,
        paused: false,
      };
    }
  }

  @SubscribeMessage('pauseTimer')
  handlePauseTimer(client: Socket) {
    if (client.rooms.size != 2) {
      client.emit('error', 'rooms');
      this.logger.log(
        `${client.id} must be in exactly one room excluding itself`,
      );
      return;
    }
    for (let room of client.rooms) {
      if (room == client.id) continue;
      this.activeTimers[room].paused = true;
    }
  }
  @SubscribeMessage('resumeTimer')
  handleResumeTimer(client: Socket) {
    if (client.rooms.size != 2) {
      client.emit('error', 'rooms');
      this.logger.log(
        `${client.id} must be in exactly one room excluding itself`,
      );
      return;
    }
    const currMillis = Date.now();
    for (let room of client.rooms) {
      if (room == client.id) continue;
      const diffMillis =
        this.activeTimers[room].endMillis - this.activeTimers[room].currMillis;
      this.activeTimers[room].currMillis = currMillis;
      this.activeTimers[room].endMillis = currMillis + diffMillis;
      this.activeTimers[room].paused = false;
    }
  }
}
