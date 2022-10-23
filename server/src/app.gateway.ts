import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: true,
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  private logger: Logger = new Logger('AppGateway'); 

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
  

  @SubscribeMessage('startTimer')
  handleMessage(client: Socket, payload: any): WsResponse<string> {
    return {event: 'startTimer', data:'Hello world!'};
  }
}
