import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainBoxComponent } from './main-box/main-box.component';
import { SliderComponent } from './main-box/slider/slider.component';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    MainBoxComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
