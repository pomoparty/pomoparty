import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(private socket: Socket) {
    this.socket.on('startTimer', (payload: string) => {
      console.log(`Received: ${payload}`)
    })
  }

  startTimer(){
    this.socket.emit('startTimer');
  }
}
