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
  ingredientes: Array<any> = [];
  constructor(private formBuild: FormBuilder, private saboreService: SaboresService, private eleRef: ElementRef) { }

  ngOnInit() {
    this.formSabores = this.formBuild.group({
      'descricao': ['', Validators.required],
      'tipo': ['',Validators.required],
      'disponivel': false
    });

    this.formEdicao = this.formBuild.group({
      'descricao': ['', Validators.required],
      'disponivel': false
    });

    this.saboreService.getSabores()
      .subscribe(sabores => {
        this.sabores = sabores
      });

      jQuery('.modal').modal();
      jQuery('ul.tabs').tabs();
      jQuery('.chips').material_chip();
      jQuery('.chips-ingredientes').material_chip({
        placeholder: 'Adicione os ingredientes',
        secondaryPlaceholder: '+Ingrediente',
      });
  }

  onSelectSabor(sabor){
    this.selectedSabor = sabor;
    console.log(this.selectedSabor);
    let chips: Array<any> = [];
    if(this.selectedSabor.ingredientes)
      this.selectedSabor.ingredientes.map(ingrediente => {
        chips.push({tag: ingrediente})
      })
    
    jQuery('.chips-selecionado').material_chip({
      data: chips,
      placeholder: 'Ingredientes',
      secondaryPlaceholder: '+ingrediente',
    })

    this.formEdicao.setValue({
      'descricao': this.selectedSabor.descricao,
      'disponivel': this.selectedSabor.disponivel
    })
  }

  updateDisponivel(){
    this.selectedSabor.disponivel = !this.selectedSabor.disponivel;
  }

  returnIngredientes(classeChips: string){
    let tags: Array<any> = jQuery(classeChips).material_chip('data');
    console.log('tags: ',tags);
    let ingredientes: Array<any> = [];
    tags.map(tag => {
      ingredientes.push(tag.tag);
    });

    return ingredientes;
  }

  onSubmitEdit(){
    let confirmbox = confirm('Tem certeza que deseja salvar os dados?')
    if (confirmbox){
      let ingredientes = this.returnIngredientes('.chips-selecionado');

      this.selectedSabor['ingredientes'] = ingredientes;
      this.saboreService.editSabor(this.selectedSabor)
        .then(() => {
          document.getElementById('closeModal').click();
          alert('Dados atualizados com sucesso');
        })
    }
      
  }

  onRemoveSabor(){
    let confirmbox = confirm('Tem certeza que deseja excluir o sabor selecionado?')
    if (confirmbox){
      this.saboreService.removeSabor(this.selectedSabor)
        .then(() => {
          alert('Sabor excluído sucesso');
        })
    }
  }
  

  onSubmitSabores(){
    let sabor = this.formSabores.value;
    let ingredientes = this.returnIngredientes('.chips-ingredientes');
    
    sabor['ingredientes'] = ingredientes;
    console.log(sabor);
    this.saboreService.saveSabor(sabor)
      .then(() =>{
        alert('Sabor cadastrado com sucesso');
        jQuery('.chips-ingredientes').material_chip({data: []});
        this.formSabores.reset();
      });
  }
}
