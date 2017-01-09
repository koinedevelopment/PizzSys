import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class CanActivateAuthService implements CanActivate{

  constructor(private authService: AuthService) { }
  observer$: Observable<boolean>
  canActivate():Observable<boolean> | boolean {
    console.log('Authservice: ',this.authService.logged)
    if(this.authService.logged){
      return true;
    }
    let observer$ = new Observable<boolean>(observer => {
      this.authService.isLoggedIn()
        .subscribe(user => {
          if(user){
            observer.next(true);
          }
          else
            observer.next(false)
        });
    });
    
    return observer$;
  } 
}
