import { AuthService } from './../services/auth.service';
import { PerfilService } from './../services/perfil.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  formPerfil: FormGroup;
  pizzaria: any;
  loaded = false;
  pizzariaKey: string;
  constructor(public formBuilder: FormBuilder, public perfilService: PerfilService, public authService: AuthService) { }

  ngOnInit() {
    
    this.formPerfil = this.formBuilder.group({
      'email': ['', Validators.required],
      'descricao': ['', Validators.required],
      'nome': ['', Validators.required],
      'ativo': {value: '', disabled: true},
      'endereco': ['', Validators.required]
    });

    this.authService.getPizzariaKey()
      .then(key => {
        this.pizzariaKey = key;
        this.perfilService.getPizzaria(key)
          .then(pizzaria => {
            this.pizzaria = pizzaria;
            console.log(this.pizzaria)
            this.formPerfil.patchValue({
              email: this.pizzaria.email,
              descricao: this.pizzaria.descricao,
              nome: this.pizzaria.nome,
              endereco: this.pizzaria.endereco,
              ativo: this.pizzaria.ativo
            })          

            jQuery(document).ready(function() {
              Materialize.updateTextFields();
            });
                  
          })
      });
      
  }

  toast(mensagem: string){
    Materialize.toast(mensagem,2000);
  }

  onSubmitPerfil(){
    this.perfilService.updatePerfil(this.formPerfil.value,this.pizzariaKey)
      .then(() =>{
        this.toast('Informações salvas com sucesso');
      })
      .catch(err => {
        alert('Algo deu errado. Tente novamente mais tarde');
        console.log(err);
      })
      
  }


}
