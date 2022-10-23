import { Component } from '@angular/core';
import { WebsocketService } from "./websocket.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [WebsocketService],
})
export class AppComponent {
  title = 'pomoparty';

  constructor(private SocketService: WebsocketService){} 

}
