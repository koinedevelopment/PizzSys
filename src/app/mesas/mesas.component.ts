import { MesasService } from './../services/mesas.service';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  formMesa: FormGroup;
  pizzaria: string;
  constructor(private formBuilder:FormBuilder, private authService: AuthService, private mesasService: MesasService) { 
    
  }

  ngOnInit() {
    this.authService.getPizzariaKey()
      .then(pizzaria => this.pizzaria = pizzaria);
    
    this.formMesa = this.formBuilder.group({
      'identificacao': ['', Validators.required],
      'observacoes': ''
    })
  }

  onSubmitMesa(){
    console.log(this.formMesa)
    this.mesasService.saveMesa(this.formMesa.value, this.pizzaria)
      .then(() => {
        this.formMesa.reset();
        alert('Pizzaria cadastrada com sucesso.');
      })
  }
}
