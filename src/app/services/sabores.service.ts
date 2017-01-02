import { FireService } from './fire.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SaboresService {

  constructor(private fireService: FireService) {

  }

  getSabores(pizzaria:string):Observable<any> {
    return this.fireService.getSabores(pizzaria)
  }

  saveSabor(sabor: any, pizzaria:string, imagem: any):firebase.Promise<any> {
    return this.fireService.saveSabor(sabor,pizzaria, imagem);
  }

  editSabor(sabor, pizzaria, imagem?):firebase.Promise<any> {
    return this.fireService.updateSabor(sabor, pizzaria, imagem);
  }

  removeSabor(sabor: any, pizzaria:string): firebase.Promise<any>{
    return this.fireService.removeSabor(sabor, pizzaria);
  }

}
