import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class FireService {
  constructor(private af: AngularFire){ 
  }

  getSabores(): Observable<any>{
    return this.af.database.list('sabores');
  }

  saveSabor(sabor: any):firebase.Promise<any> {
    return this.af.database.list('sabores').push(sabor)
  }
  
  removeSabor(sabor: any): firebase.Promise<any>{
    return this.af.database.list('sabores').remove(sabor.$key);
  }

  updateSabor(sabor: any):firebase.Promise<any>{
    let key = sabor.$key;
    console.log('sabor fire: ',sabor);
    return this.af.database.list('sabores').update(key, {descricao: sabor.descricao, disponivel: sabor.disponivel, ingredientes: sabor.ingredientes});
  }
}
