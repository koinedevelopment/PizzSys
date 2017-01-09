import { Observable, Subscription } from 'rxjs/Rx';
import { FireService } from './../services/fire.service';
import { AuthService } from './../services/auth.service';
import { PedidosService } from './../services/pedidos.service';
import { Component, OnInit } from '@angular/core';


declare var jQuery: any;
declare var Materialize: any;


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})

export class PedidosComponent implements OnInit{
  pedidos: any[];
  pedidosAtendidos: any[] = [];
  agora: number;
  now: Date = new Date();
  pizzariaKey: string;
  
  constructor(private pedidosService: PedidosService, private authService: AuthService, private fireService: FireService ) { }

  ngOnInit() {
    console.log(this.now);
    this.agora = Math.floor((new Date().getTime()));
    console.log(this.agora);
    this.authService.getPizzariaKey()
      .then(pizzariaKey => {
        this.pizzariaKey = pizzariaKey;
        this.getPedidos();
      });

    jQuery('ul.tabs').tabs();
  }

  toast(mensagem: string){
    Materialize.toast(mensagem, 2000);
  }

  orderBy(modo: string, asc?: boolean){
    switch(modo){
      case 'mesa': 
        let aux;
        let max: number = 0;

        console.log(this.pedidos.sort((a,b) => a.numeroMesa - b.numeroMesa ));
        break;
      case 'sabor':
        console.log(this.pedidos.sort((a,b) => {
          let saborA = a.sabor.toUpperCase(); // ignore upper and lowercase
          let saborB = b.sabor.toUpperCase(); // ignore upper and lowercase
          if (saborA < saborB) {
            return -1;
          }
          if (saborA > saborB) {
            return 1;
          }

          // names must be equal
          return 0;
        }));
        console.log('sabor');
        break;
      case 'espera':
        console.log(this.pedidos.sort((a,b) => a.timestamp - b.timestamp ));
        console.log('espera');
        break;
    }

  } 

  onSelectAtender(event, pedido){
    console.log('Event: ',event.checked);
    if(event.checked)
      this.pedidosAtendidos.push(pedido);
    else{
      let index = this.pedidosAtendidos.indexOf(pedido);
      if(index > -1)
        this.pedidosAtendidos.splice(index,1);
    }
    console.log(pedido);
  }

  onAtenderPedidos(){
    this.pedidosService.atenderPedidos(this.pedidosAtendidos, this.pizzariaKey)
      .then(_ => {
        this.toast('Pedidos atendidos.');
      })
      .catch(err => {
        console.log(err);
      })
    
  }
  
  getPedidos(){
    this.pedidosService.getPedidos(this.pizzariaKey)
      .subscribe(pedidos => {
        this.now = new Date();
        this.agora = Math.floor((new Date().getTime()));
        this.pedidos = pedidos;
        this.pedidos.map(pedido => {
          ((this.agora - pedido.timestamp)/60000) > 1 ? pedido['tempo_espera'] = ((this.agora - pedido.timestamp)/60000).toFixed(0) + ' Minutos' : pedido['tempo_espera'] = 'Agora' 
        })
        console.log(this.pedidos);
      })
  }


}
