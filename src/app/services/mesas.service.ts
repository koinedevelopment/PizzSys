import { Observable } from 'rxjs/Rx';
import { FireService } from './fire.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MesasService {

  constructor(public fireService: FireService) { }

  saveMesa(mesa: any){
    return this.fireService.saveMesa(mesa);
  }

  getMesas():Observable<any> {
    return this.fireService.getMesas();
  }

  removeMesa(pizzariaKey, mesaKey):firebase.Promise<any> {
    return this.fireService.removeMesa(pizzariaKey, mesaKey);
  }

  updateMesa(pizzariaKey: string, mesa: any):firebase.Promise<any> {
    return this.fireService.updateMesa(pizzariaKey, mesa);
  }
}
