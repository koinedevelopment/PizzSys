import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { FireService } from './fire.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  pizzaria: string = null;
  logged: boolean = false;
  logged$: Observable<any>;

  constructor(private fireService: FireService, private af: AngularFire ) {


  }

  signup(user):firebase.Promise<any> {
    return this.fireService.signup(user);
  
  }

  isLoggedIn():Observable<any> {
    let isLogged = false;
    console.log(firebase.auth().currentUser)
    if(firebase.auth().currentUser){
      isLogged = true;
    }
    //console.log(this.af.auth.getAuth());
    return this.af.auth.asObservable();
  }  


  login(user):firebase.Promise<any> {
    return this.fireService.signin(user);
  }

  logout(){
    this.pizzaria = null;
    this.fireService.logout();

  }

  getPizzariaKey():Promise<string> {
    let promise: Promise<string>;
    promise = new Promise ((resolve, reject) => {
      if(this.pizzaria)
        resolve(this.pizzaria)
      else
        this.fireService.getPizzariaKey()
          .then(pizzaria => {
            this.pizzaria = pizzaria;
            resolve(pizzaria);
          });
    });
    return promise;
  }
}
