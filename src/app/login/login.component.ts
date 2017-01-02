import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  formSignup: FormGroup;
  constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router) {
    this.formLogin = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })

    this.formSignup = this.formBuilder.group({
      'email': ['', Validators.required],
      'pizzaria': ['', Validators.required],
      'password': ['', Validators.required],
      'password_confirm': ['', Validators.required]
    })  
  }

  ngOnInit() {
    jQuery('.modal').modal();
  }

  
  toast(mensagem: string){
    Materialize.toast(mensagem, 2000);
  }

  onSubmitLogin(){
    let user = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password
    };

    this.authService.login(user)
      .then(() => {
        this.formLogin.reset();
      })
      .catch(err => {
        if(err['code'] == "auth/wrong-password"){
          alert('Senha incorreta.');
          this.formLogin.controls['password'].reset();
        }

        else if(err['code'] == "auth/user-not-found"){
          alert('Usuário não cadastrado.');
          this.formLogin.reset();
        }

        else if(err['code'] == "auth/invalid-email"){
          alert('Digite um email válido.');
          this.formLogin.reset();
        }
        else if(err['code'] == "auth/email-already-in-use"){
          alert('O email digitado já foi cadastrado em nossa base de dados. Por favor, utilize outro email ou insira a senha correta.');
          this.formLogin.reset();
        }
        console.log(err);
      })
  }
  
  onSubmitSignup(){
    console.log('onsubmitlogin'); 
    if(this.formSignup.value.password != this.formSignup.value.password_confirm){
      alert('As senhas não coincidem.');
      this.formSignup.controls['password_confirm'].reset();
    }
    else{
      let signup = {
        email: this.formSignup.value.email,
        pizzaria: this.formSignup.value.pizzaria,
        password: this.formSignup.value.password
      }
      this.authService.signup(signup)
        .then(() => {
          this.toast('Usuário criado com sucesso.');
          this.router.navigate(['sabores']);
        })
        .catch(err => {
          if(err['code'] == "auth/email-already-in-use"){
            alert('O email digitado já foi cadastrado em nossa base de dados. Por favor, utilize outro email ou insira a senha correta.');
            this.formSignup.reset();
          }
        })
    }  
  }
}
