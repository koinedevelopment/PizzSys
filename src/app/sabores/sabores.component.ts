import { SaboresService } from './../services/sabores.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

declare var jQuery:any;

@Component({
  selector: 'app-sabores',
  templateUrl: './sabores.component.html',
  styleUrls: ['./sabores.component.css']
})
export class SaboresComponent implements OnInit {

  @ViewChild('imagemSabor')
  inputView: any;
  pizzaria: any;
  sabores: any;
  formSabores: FormGroup;
  formEdicao: FormGroup;
  selectedSabor: any = {
    descricao: '',
    disponivel: true
  };
  ingredientes: Array<any> = [];
  inputImagem: any;
  imagemSelecionada: any;
  imagemEditSelecionada: any;

  constructor(private formBuild: FormBuilder, private saborService: SaboresService, private eleRef: ElementRef) { }

  ngOnInit() {
    this.formSabores = this.formBuild.group({
      'descricao': ['', Validators.required],
      'tipo': ['',Validators.required],
      'disponivel': true
    });

    this.formEdicao = this.formBuild.group({
      'descricao': ['', Validators.required],
      'disponivel': true
    });

      jQuery('.modal').modal();
      jQuery('ul.tabs').tabs();
      jQuery('.chips').material_chip();
      jQuery('.chips-ingredientes').material_chip({
        placeholder: 'Adicione os ingredientes',
        secondaryPlaceholder: '+Ingrediente',
      });

      this.saborService.getPizzaria()
        .then(pizzaria => {
          this.pizzaria = pizzaria;

          this.saborService.getSabores(pizzaria)
            .subscribe(sabores => {
              this.sabores = sabores
            });
        })
  }

  onSelectSabor(sabor){
    this.selectedSabor = sabor;
    this.selectedSabor.imageURL ? this.imagemEditSelecionada = this.selectedSabor.imageURL : this.imagemEditSelecionada = null; 
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

  onChange(event){
    let fileReader = new FileReader();
    this.inputImagem = event.srcElement.files[0];

    if(this.inputImagem.type !== "image/png" && this.inputImagem.type !== "image/jpeg"){
      this.resetInputImage();
      alert('Informe um arquivo do tipo JPG ou PNG');
    }
    else if(this.inputImagem.size > 100000){
      alert('Informe um arquivo com tamanho até 100KB')
      this.resetInputImage();
    }
    else{
      fileReader.onload = () => {
        this.imagemSelecionada = fileReader.result;
      }

      fileReader.readAsDataURL(this.inputImagem);
    }
  }

  onChangeEdit(event){
    let fileReader = new FileReader();
    this.inputImagem = event.srcElement.files[0];

    if(this.inputImagem.type !== "image/png" && this.inputImagem.type !== "image/jpeg"){
      this.resetInputImage(true);
      alert('Informe um arquivo do tipo JPG ou PNG');
    }
    else if(this.inputImagem.size > 100000){
      this.resetInputImage(true);
      alert('Informe um arquivo com tamanho até 100KB')
    }
    else{
      fileReader.onload = () => {
        this.imagemEditSelecionada = fileReader.result;
      }

      fileReader.readAsDataURL(this.inputImagem);
    }
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
      this.saborService.editSabor(this.selectedSabor, this.pizzaria, this.inputImagem)
        .then(() => {
          jQuery('#modalSabor').modal('close');
          this.resetInputImage();
          alert('Dados atualizados com sucesso');
        })
    }
      
  }

  onRemoveSabor(){
    let confirmbox = confirm('Tem certeza que deseja excluir o sabor selecionado?')
    if (confirmbox){
      document.getElementById('closeModal').click();
      this.saborService.removeSabor(this.selectedSabor)
        .then(() => {
          document.getElementById('closeModal').click();
          alert('Sabor excluído sucesso');
          jQuery('#modalSabor').modal('close');
        })
    }
  }
  

  onSubmitSabores(){
    let sabor = this.formSabores.value;
    let ingredientes = this.returnIngredientes('.chips-ingredientes');
    
    sabor['ingredientes'] = ingredientes;
    console.log(sabor);
    this.saborService.saveSabor(sabor,this.pizzaria, this.inputImagem)
      .then( snap =>{
        alert('Sabor cadastrado com sucesso');
        jQuery('.chips-ingredientes').material_chip({data: []});
        this.imagemSelecionada = "";
        this.formSabores.reset();
        this.resetInputImage();
      });
      
  }

  resetInputImage(edit?:boolean){
    if(edit){
      this.inputView.nativeElement.value = "";
      this.inputImagem = null;  
    } 
    else{
      this.inputView.nativeElement.value = "";
      this.inputImagem = null;
      this.imagemSelecionada = null;
    }       
  }
  
}
