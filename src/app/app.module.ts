import {CanActivateAuthService} from './services/canActivate';
import { PerfilService } from './services/perfil.service';
import { MesasService } from './services/mesas.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { routing } from './app.routing';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { FireService } from './services/fire.service';
import { SaboresService } from './services/sabores.service' 
import 'hammerjs';
  
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SaboresComponent } from './sabores/sabores.component';
import { IngredientesComponent } from './ingredientes/ingredientes.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MesasComponent } from './mesas/mesas.component';
import { SaboresCadastroComponent } from './sabores-cadastro/sabores-cadastro.component';


const config = {
  apiKey: "AIzaSyAIMHqUTlyxobJgz6vFP2fAe5AJ17KCg-A",
  authDomain: "pizz-cc946.firebaseapp.com",
  databaseURL: "https://pizz-cc946.firebaseio.com",
  storageBucket: "pizz-cc946.appspot.com",
  messagingSenderId: "229381592184"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SaboresComponent,
    IngredientesComponent,
    LoginComponent,
    PerfilComponent,
    MesasComponent,
    SaboresCadastroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config, myFirebaseAuthConfig)
  ],
  providers: [
    SaboresService,
    FireService,
    AuthService,
    MesasService,
    PerfilService,
    CanActivateAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
