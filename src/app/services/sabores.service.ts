import { FireService } from './fire.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SaboresService {

  constructor(private fireService: FireService) {

  }

  getSabores():Observable<any> {
    return this.fireService.getSabores()
  }

  saveSabor(sabor: any, imagem: any):firebase.Promise<any> {
    return this.fireService.saveSabor(sabor, imagem);
  }

  editSabor(sabor, imagem?):firebase.Promise<any> {
    return this.fireService.updateSabor(sabor, imagem);
  }

  removeSabor(sabor: any): firebase.Promise<any>{
    return this.fireService.removeSabor(sabor);
  }
}
