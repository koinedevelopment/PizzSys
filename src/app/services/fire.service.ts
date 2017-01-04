import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

@Injectable()

export class FireService {

  storageRef = firebase.storage().ref();
  pizzaria;
  constructor(private af: AngularFire){ 
    this.isLoggedIn()
      .subscribe(user => {
        if(user){
          this.getPizzariaKey()
            .then(pizzariaKey => {
              this.getPizzaria(pizzariaKey)
                .then(pizzaria => {
                  this.pizzaria = pizzaria;
                  this.pizzaria['key'] = pizzariaKey;
                  console.log('Pizzaria fire.service: ',pizzaria);
                })
            })
        }

      })
  }

  isLoggedIn(){
    return this.af.auth.asObservable();
      
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
          resolve(snap.val() );
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
          return this.af.database.list('saboresPorPizzaria/'+pizzaria+'/sabores/').update(key, {descricao: sabor.descricao, disponivel: sabor.disponivel, ingredientes: sabor.ingredientes, tipo_disponivel: sabor.tipo_disponivel, imageURL: snap.downloadURL});
        })
    }
    else
      return this.af.database.list('saboresPorPizzaria/'+pizzaria+'/sabores/').update(key, {descricao: sabor.descricao, disponivel: sabor.disponivel, tipo_disponivel: sabor.tipo_disponivel, ingredientes: sabor.ingredientes});
  }
  
  updateDisponibilidade(pizzariaKey, saborKey: string, tipo_disponivel:string, disponivel: boolean):firebase.Promise<any> {
    
    return this.af.database.list('saboresPorPizzaria/'+pizzariaKey+'/sabores/').update(saborKey, {disponivel: disponivel, tipo_disponivel: tipo_disponivel});
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
    this.pizzaria = {};
  }

  saveMesa(mesa:any):firebase.Promise<any> {
    console.log(mesa);
    mesa['pizzariaNome'] = this.pizzaria.nome;
    console.log(this.pizzaria.key);
    return this.af.database.list('mesasPorPizzaria/'+this.pizzaria.key).push(mesa);
  }

  getMesas():Observable<any> {
    return this.af.database.list('mesasPorPizzaria/'+this.pizzaria.key);
  }

  removeMesa(pizzariaKey: string, mesaKey: string):firebase.Promise<any> {
    return this.af.database.list('mesasPorPizzaria/'+pizzariaKey+'/'+mesaKey).remove()
  }

  updateMesa(pizzariaKey: string, mesa: any):firebase.Promise<any> {
    return this.af.database.list('mesasPorPizzaria/'+pizzariaKey).update(mesa.$key, {identificacao: mesa.identificacao, observacoes: mesa.observacoes});
  } 

  updatePerfil(perfil: any, pizzariaKey: string){
    console.log(pizzariaKey);
    console.log(perfil)
    return this.af.database.list('pizzarias/').update(pizzariaKey,{ativo: perfil.ativo, descricao: perfil.descricao, email: perfil.email, endereco: perfil.endereco, nome: perfil.nome})
  }

  getPedidosAbertos(pizzariaKey: string ):Observable<any> {
    return this.af.database.list('pedidosPorPizzaria/'+pizzariaKey+'/', {
      query: {
        orderByChild: 'atendido',
        equalTo: false
      } 
    });
  }

  gerarPedido(pizzariaKey: string){  //função para teste. Apagar depois.
    let hoje = new Date();
    let timestampHoje: number = (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() ).getTime()) / 1000;
    console.log('timestampHoje: ', timestampHoje);
    let atendido: boolean = false;
    let mesa;
    for(let i = 0; i < 200; i++ ){
      if(i % 2 == 0){
        atendido = true;
      }
      else{
        atendido = false;
      }
      if(i % 3 == 0)
        mesa = '12';
      else 
        mesa = '14'

      this.af.database.list('pedidosPorMesaPorPizzaria/'+ pizzariaKey+ '/1483498800').push({
          idMesa: mesa,
          keyMesa: '-K_VYPDv8R2fQUnCttpR',
          keySabor: "-K_4wN_PztS82q7KXcvN",
          saborDescricao: "Atum"+i,
          timestamp: timestampHoje,
          atendido: atendido
      })
    } 
  }

  atenderPedidos(pedidos: any[], pizzariaKey: string):Promise<any>{
    let promises: Promise<any>[] = [];
    pedidos.map(pedido => {
      this.af.database.list('pedidosPorPizzaria/'+ pizzariaKey).update(pedido.$key, {atendido: true})
        .then(_ => {
          promises.push(Promise.resolve(true));
        });
    });
    return Promise.all(promises);
  }
}
