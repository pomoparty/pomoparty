import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: true,
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger('AppGateway');

  private activeTimers: {
    [key: string]: NodeJS.Timer;
  } = {};

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
  handleJoinRoom(client: Socket, room: string): WsResponse<string> {
    client.join(room);
    return { event: 'joinRoom', data: room };
  }

  @SubscribeMessage('startTimer')
  handleMessage(client: Socket, durationMillis: number) {
    this.logger.log('startTimer Received');
    if (client.rooms.size != 2) {
      client.emit('error', 'rooms');
      this.logger.log(
        `${client.id} must be in exactly one room excluding itself`,
      );
      return;
    }
    const startTimeMillis: number = Date.now();

    // Cast number to number because postman still sends payload as string
    const endTimeMillis: number = startTimeMillis + Number(durationMillis);
    for (let room of client.rooms) {
      if (room == client.id) continue;
      this.logger.log(room);
      this.server.to(room).emit('startTimer', endTimeMillis);
      this.logger.log(
        `${client.id} has started the timer in ${room} for ${durationMillis} milliseconds`,
      );
      let interval = setInterval(() => {
        this.server.to(room).emit('updateTimer', endTimeMillis - Date.now());
        if (endTimeMillis - Date.now() <= 0) {
          this.logger.log('timer stopped');
          clearInterval(this.activeTimers[room]);
        }
      }, 1000); // tick every second
      this.activeTimers[room] = interval;
    }
  }
}
