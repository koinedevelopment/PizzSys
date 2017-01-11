import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class CanActivateAuthService implements CanActivate{
  logged = false;
  constructor(private authService: AuthService, private af: AngularFire, private router: Router) {
    /*this.af.auth.subscribe(user => {
      if(user){
        
        this.logged = true;
      }
    }) */
  }
  observer$: Observable<boolean>
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :Observable<boolean> | boolean {
    if(firebase.auth().currentUser){
      console.log('current user');
      return true;
    }
    this.observer$ = new Observable<boolean>(observer => {
      firebase.auth().onAuthStateChanged(user => {
        if(user)
          observer.next(true);
        else{
          observer.next(false);
          this.router.navigate(['/login']);
        }
      })
    })
    return this.observer$;
    /*
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
    
    return observer$; */
  } 
}
