import { Observable } from 'rxjs/Rx';
import { FireService } from './fire.service';
import { Injectable } from '@angular/core';

@Injectable()
export class MesasService {

  constructor(public fireService: FireService) { }

  saveMesa(mesa: any, pizzaria: string){
    return this.fireService.saveMesa(mesa, pizzaria);
  }

  getMesas(pizzariaKey: string):Observable<any> {
    return this.fireService.getMesas(pizzariaKey);
  }
}
