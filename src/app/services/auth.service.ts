import { Observable } from 'rxjs/Rx';
import { FireService } from './fire.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  pizzaria: string = null;
  
  constructor(public fireService: FireService) {

  }

  signup(user):firebase.Promise<any> {
    return this.fireService.signup(user);
  
  }

  isLoggedIn():Observable<any> {
     return this.fireService.isLoggedIn();
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
