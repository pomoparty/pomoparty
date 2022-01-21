import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainBoxComponent } from './main-box/main-box.component';
import { SliderComponent } from './main-box/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    MainBoxComponent,
    SliderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
