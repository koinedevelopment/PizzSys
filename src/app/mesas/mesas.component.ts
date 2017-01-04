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
    numeroMesa: '',
    observacoes: '',
    qrCode: ''
  };
  constructor(private formBuilder:FormBuilder, private authService: AuthService, private mesasService: MesasService) { 
    
  }

  ngOnInit() {
    this.authService.getPizzariaKey()
      .then(pizzariaKey => this.pizzariaKey = pizzariaKey);
    this.mesasService.getMesas()
      .subscribe(mesas => this.mesas = mesas);
    this.formMesa = this.formBuilder.group({
      'numeroMesa': ['', Validators.required],
      'observacoes': ''
    })

    jQuery('.modal').modal();
  }

  toast(mensagem: string){
    Materialize.toast(mensagem, 2000)
  }

  onSubmitMesa(){
    console.log(this.formMesa)
    this.mesasService.saveMesa(this.formMesa.value)
      .then(() => {
        this.formMesa.reset();
        this.toast('Mesa cadastrada com sucesso.');
      })
  }

  onSelectMesa(mesa: any){
    this.selectedMesa = mesa;
    this.selectedMesa.qrCode = this.pizzariaKey + '|' + this.selectedMesa.$key;
  }

  onRemoveMesa(){
    if(confirm('Deseja excluir a mesa?'))
      this.mesasService.removeMesa(this.pizzariaKey, this.selectedMesa.$key)
        .then(_ => {          
          this.toast('Mesa excluída com sucesso');
          jQuery('#modalMesa').modal('close');
        });
  }

  onSubmitEdit(){
    this.mesasService.updateMesa(this.pizzariaKey, this.selectedMesa)
      .then(_ => {
        this.toast('Mesa alterada com sucesso.');
      })
      .catch(err => console.log(err));
  }
}
