import { MesasService } from './../services/mesas.service';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare var Materialize: any;
declare var jQuery: any;

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  formMesa: FormGroup;
  pizzariaKey: string;
  mesas: any;
  selectedMesa:any = {
    identificao: '',
    observacoes: '',
    qrCode: ''
  };
  constructor(private formBuilder:FormBuilder, private authService: AuthService, private mesasService: MesasService) { 
    
  }

  ngOnInit() {
    
    this.authService.getPizzariaKey()
      .then(pizzariaKey => {
        this.pizzariaKey = pizzariaKey;
        this.mesasService.getMesas(this.pizzariaKey)
          .subscribe(mesas => this.mesas = mesas) 
      });
    
    this.formMesa = this.formBuilder.group({
      'identificacao': ['', Validators.required],
      'observacoes': ''
    })

    jQuery('.modal').modal();
  }

  toast(mensagem: string){
    Materialize.toast(mensagem, 2000)
  }

  onSubmitMesa(){
    console.log(this.formMesa)
    this.mesasService.saveMesa(this.formMesa.value, this.pizzariaKey)
      .then(() => {
        this.formMesa.reset();
        this.toast('Mesa cadastrada com sucesso.');
      })
  }

  onSelectMesa(mesa: any){
    this.selectedMesa = mesa;
    this.selectedMesa.qrCode = this.pizzariaKey + '|' + this.selectedMesa.$key;
  }
}
