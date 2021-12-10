import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { ViewComponent } from './view/view.component';

import { RestService } from './services/rest.service';
import { CRUDService } from './services/crud.service';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    RestService,
    CRUDService
  ],
  exports:[
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
