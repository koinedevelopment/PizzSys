import { FireService } from './fire.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(public fireService: FireService) { }

  signup(user):firebase.Promise<any> {
    return this.fireService.signup(user);
  
  }

  login(user):firebase.Promise<any> {
    return this.fireService.signin(user);
  }
}
