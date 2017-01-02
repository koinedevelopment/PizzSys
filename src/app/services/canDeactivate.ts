import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class CanActivateAuthService implements CanActivate{

  constructor(private authService: AuthService) { }

  canActivate():Observable<boolean> | boolean {
    let observer$ = new Observable(observer => {
      this.authService.isLoggedIn()
        .subscribe(user => {
          if(user)
            observer.next(true)
          else
            observer.next(false)
        });
    });
    return observer$;
  } 
}
