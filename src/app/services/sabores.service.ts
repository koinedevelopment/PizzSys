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
    
    sabor['tipo_disponivel'] = sabor.disponivel.toString().concat('_',sabor.tipo);
    console.log(sabor);
    return this.fireService.saveSabor(sabor,pizzaria, imagem);
  }

  editSabor(sabor, pizzaria, imagem?):firebase.Promise<any> {
    sabor['tipo_disponivel'] = sabor.disponivel.toString().concat('_',sabor.tipo);
    console.log(sabor);
    return this.fireService.updateSabor(sabor, pizzaria, imagem);
  }

  removeSabor(sabor: any, pizzaria:string): firebase.Promise<any>{
    return this.fireService.removeSabor(sabor, pizzaria);
  }

  updateDisponibilidade(pizzariaKey: string, saborKey: string, saborTipo: string, disponivel: boolean):firebase.Promise<any>{
    let tipo_disponivel  = disponivel.toString().concat('_',saborTipo);
    return this.fireService.updateDisponibilidade(pizzariaKey, saborKey, tipo_disponivel, disponivel);
  }

}
