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

  saveSabor(sabor: any):firebase.Promise<any> {
    return this.fireService.saveSabor(sabor);
  }

  editSabor(sabor):firebase.Promise<any> {
    return this.fireService.updateSabor(sabor);
  }

  removeSabor(sabor: any): firebase.Promise<any>{
    return this.fireService.removeSabor(sabor);
  }
}
