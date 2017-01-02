import { Observable } from 'rxjs/Rx';
import { FireService } from './fire.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PerfilService {

  constructor(public fireService: FireService) { }

  getPizzaria(key:string):Promise<any> {
    return this.fireService.getPizzaria(key);
  }

  updatePerfil(perfil: any, pizzariaKey:string){
    return this.fireService.updatePerfil(perfil, pizzariaKey);
  }
}
