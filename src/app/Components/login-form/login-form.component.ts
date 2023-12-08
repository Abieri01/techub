import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  cad:boolean=false
  mensagem:string=''
  cadUser(email:any, senha:any, rpSenha:any){
    this.mensagem=''
    if(email=='' || senha=='' || rpSenha==''){
      this.mensagem='Algum campo está vazio.'
    }else if(senha!=rpSenha){
      this.mensagem='As senhas precisam ser iguais!'
    }else{
      this.mensagem='Usuário cadastrado'

  createUserWithEmailAndPassword(this.auth, email, senha)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
    }
  }

  Logar(email:any, senha:any){
    console.log(`Usuário: ${email} logado com senha: ${senha} `)
  }
  
  

  constructor(private auth:Auth) { }

  ngOnInit() {}


  





  }
