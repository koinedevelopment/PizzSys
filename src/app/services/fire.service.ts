import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class FireService {

  storageRef = firebase.storage().ref();

  constructor(private af: AngularFire){ 
  }

  getSabores(pizzaria:string): Observable<any>{
    return this.af.database.list('saboresPorPizzaria/'+pizzaria+'/sabores');
  }

  getPizzariaKey():Promise<any> {
    let uid = firebase.auth().currentUser.uid;
    let promise: Promise<string>;
    promise = new Promise((resolve, reject) => {
      firebase.database().ref('usuarioPorPizzaria/'+uid).once('value')
        .then(snap => {
          resolve(snap.val().keyPizzaria)
        })
    });
    return promise;
  }

  getPizzaria(key):Promise<any> {
    let promise: Promise<any>;
    promise = new Promise((resolve, reject) => {
      firebase.database().ref('pizzarias/'+key).once('value')
        .then(snap => {
          resolve(snap.val());
        });
    });
    
    return promise;
  }

  saveSabor(sabor: any, pizzaria:string, imagem?: any):firebase.Promise<any> {
    if(imagem){
      let key = this.af.database.list('saboresPorPizzaria/'+pizzaria+'/sabores/').push(sabor).key;
      return firebase.storage().ref('sabores/'+key).put(imagem)
        .then(snap => {
          return firebase.database().ref('saboresPorPizzaria/'+pizzaria+'/sabores/'+key).update({imageURL: snap.downloadURL})
        })
    }
    else{
       return this.af.database.list('saboresPorPizzaria/'+pizzaria+'/sabores/').push(sabor);
     }
  }
  
  removeSabor(sabor: any, pizzaria): firebase.Promise<any>{
    return this.af.database.list('saboresPorPizzaria/'+pizzaria+'/sabores/').remove(sabor.$key);
  }

  updateSabor(sabor: any, pizzaria:string, imagem?:any):firebase.Promise<any>{
    let key = sabor.$key;
    if(imagem){
      return firebase.storage().ref('sabores/'+key).put(imagem)
        .then(snap => {
          return this.af.database.list('saboresPorPizzaria/'+pizzaria+'/sabores/').update(key, {descricao: sabor.descricao, disponivel: sabor.disponivel, ingredientes: sabor.ingredientes, imageURL: snap.downloadURL});
        })
    }
    else
      return this.af.database.list('saboresPorPizzaria/'+pizzaria+'/sabores/').update(key, {descricao: sabor.descricao, disponivel: sabor.disponivel, ingredientes: sabor.ingredientes});
  }

  signup(user):Promise<any> {
    let promise: Promise<any>;
    let uid: string;
    let keyPizzaria: string; 
    promise = new Promise((resolve, reject) => {
      this.af.auth.createUser({email: user.email, password: user.password})
        .then(data => {
          uid = data.uid;
          let key = firebase.database().ref('pizzarias/').push({
            nome: user.pizzaria,
            users: {
              admin: data.uid
            },
            email: data.auth.email,
            ativo: false,
            endereco: '',
            descricao: ''
          })
            .then(data => {
                firebase.database().ref('usuarioPorPizzaria/'+uid).set({
                  keyPizzaria: data.key
                })
                  .then(data => {
                    resolve(true);
                  })
            })
        });
    })
    
    return promise;
  }

  signin(user):firebase.Promise<any>{
    console.log(user)
    return this.af.auth.login({email: user.email, password: user.password}, { provider: AuthProviders.Password, method: AuthMethods.Password})
  }

  logout(){
    this.af.auth.logout();
  }

  saveMesa(mesa:any, pizzaria:string):firebase.Promise<any> {
    return this.af.database.list('mesasPorPizzaria/'+pizzaria).push(mesa);
  }

  updatePerfil(perfil: any, pizzariaKey: string){
    console.log(pizzariaKey);
    console.log(perfil)
    return this.af.database.list('pizzarias/').update(pizzariaKey,{ativo: perfil.ativo, descricao: perfil.descricao, email: perfil.email, endereco: perfil.endereco, nome: perfil.nome})
  }
}
