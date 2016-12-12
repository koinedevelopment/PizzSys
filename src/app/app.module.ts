import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { routing } from './app.routing';
import { AngularFireModule } from 'angularfire2';
import { FireService } from './services/fire.service';
import { SaboresService } from './services/sabores.service' 
import 'hammerjs';
  
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SaboresComponent } from './sabores/sabores.component';


const config = {
  apiKey: "AIzaSyAIMHqUTlyxobJgz6vFP2fAe5AJ17KCg-A",
  authDomain: "pizz-cc946.firebaseapp.com",
  databaseURL: "https://pizz-cc946.firebaseio.com",
  storageBucket: "pizz-cc946.appspot.com",
  messagingSenderId: "229381592184"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaboresComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config)
  ],
  providers: [
    SaboresService,
    FireService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
