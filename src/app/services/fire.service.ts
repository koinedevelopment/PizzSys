import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class FireService {

  storageRef = firebase.storage().ref();

  constructor(private af: AngularFire){ 
  }

  getSabores(): Observable<any>{
    return this.af.database.list('sabores');
  }

  saveSabor(sabor: any, imagem?: any):firebase.Promise<any> {
    if(imagem){
      let key = this.af.database.list('sabores/').push(sabor).key;
      return firebase.storage().ref('sabores/'+key).put(imagem)
        .then(snap => {
          return firebase.database().ref('sabores/'+key).update({imageURL: snap.downloadURL})
        })
    }
    else{
       return this.af.database.list('sabores/').push(sabor);
     }
    
  }
  
  removeSabor(sabor: any): firebase.Promise<any>{
    return this.af.database.list('sabores').remove(sabor.$key);
  }

  updateSabor(sabor: any, imagem?:any):firebase.Promise<any>{
    let key = sabor.$key;
    if(imagem){
      return firebase.storage().ref('sabores/'+key).put(imagem)
        .then(snap => {
          return this.af.database.list('sabores').update(key, {descricao: sabor.descricao, disponivel: sabor.disponivel, ingredientes: sabor.ingredientes, imageURL: snap.downloadURL});
        })
    }
    else
      return this.af.database.list('sabores').update(key, {descricao: sabor.descricao, disponivel: sabor.disponivel, ingredientes: sabor.ingredientes});
  }
}
