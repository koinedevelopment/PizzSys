import { Observable } from 'rxjs/Rx';
import { FireService } from './fire.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  pizzaria: string = null;
  logged: boolean = false;
  logged$: Observable<any>;

  constructor(public fireService: FireService) {
    this.logged$ = new Observable<boolean>(observer => {
      this.fireService.isLoggedIn()
        .subscribe(result => {
          if (result){
            console.log(result);
            this.logged = true;
            observer.next(true)
          }
          else{
            this.logged = false;
            observer.next(false)
          }
        })
    })

  }

  signup(user):firebase.Promise<any> {
    return this.fireService.signup(user);
  
  }

  isLoggedIn():Observable<any> {
    let observable$: Observable<boolean> = new Observable<boolean>(observer => {
      this.fireService.isLoggedIn()
        .subscribe(result => {
          if (result){
            this.logged = true;
            observer.next(true)
          }
          else{
            this.logged = false;
            observer.next(false)
          }
        })
    })
     return this.logged$;
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
