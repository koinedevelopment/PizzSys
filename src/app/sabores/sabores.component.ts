import { SaboresService } from './../services/sabores.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

declare var jQuery:any;

@Component({
  selector: 'app-sabores',
  templateUrl: './sabores.component.html',
  styleUrls: ['./sabores.component.css']
})
export class SaboresComponent implements OnInit {

  sabores: any;
  formSabores: FormGroup;
  formEdicao: FormGroup;
  selectedSabor: any = {
    descricao: '',
    disponivel: false
  };
  constructor(private formBuild: FormBuilder, private saboreService: SaboresService, private eleRef: ElementRef) { }

  ngOnInit() {
    this.formSabores = this.formBuild.group({
      'descricao': ['', Validators.required],
      'disponivel': false
    });

    this.formEdicao = this.formBuild.group({
      'descricao': ['', Validators.required],
      'disponivel': false
    });

    this.saboreService.getSabores()
      .subscribe(sabores => {
        console.log(sabores);
        this.sabores = sabores
      });

      jQuery('.modal').modal();
  }

  onSelectSabor(sabor){
    this.selectedSabor = sabor;
    console.log(this.selectedSabor);
    this.formEdicao.setValue({
      'descricao': this.selectedSabor.descricao,
      'disponivel': this.selectedSabor.disponivel
    })
  }
  updateDisponivel(){
    this.selectedSabor.disponivel = !this.selectedSabor.disponivel;
  }

  onSubmitEdit(){
    let confirmbox = confirm('Tem certeza que deseja salvar os dados?')
    if (confirmbox)
      this.saboreService.editSabor(this.selectedSabor)
        .then(() => {
          alert('Dados atualizados com sucesso');
        })
  }

  onSubmitSabores(){
    this.saboreService.saveSabor(this.formSabores.value)
      .then(() =>{
        alert('Sabor cadastrado com sucesso');
        this.formSabores.reset();
      });
  }
}
