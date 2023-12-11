import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut  } from '@angular/fire/auth';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent  implements OnInit {

  cad:boolean=false
  mensagem:string=''
  logado:boolean=false
  isToastOpen = false
  user:any={nome:'', foto:''}

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  cadUser(email:any, senha:any, rpSenha:any){
    this.mensagem=''
    if(email=='' || senha=='' || rpSenha==''){
      this.mensagem='Algum campo está vazio.'
      this.setOpen(true)
    }else if(senha!=rpSenha){
      this.mensagem='As senhas precisam ser iguais!'
      this.setOpen(true)
    }else{
      this.mensagem='Usuário cadastrado'
      this.setOpen(true)
      this.cad=!this.cad

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
  signInWithEmailAndPassword(this.auth, email, senha)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    this.mensagem=`Usuário ${user.email} logado com sucesso!`
    this.setOpen(true)
    this.logado=!this.logado
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }

  logout(){
    this.mensagem='Logout efetuado com sucesso!'
    this.setOpen(true)
    this.logado=!this.logado
    this.logoutcomGoogle()
  }
  
  logincomGoogle(){
  const provider = new GoogleAuthProvider()
  signInWithPopup(this.auth, provider)
  .then((result) => {
    console.log(result)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    this.mensagem=`Usuário ${result.user.displayName} logado com sucesso!`
    this.user.nome=result.user.displayName
    this.user.foto=result.user.photoURL
    this.setOpen(true)
    this.logado=!this.logado

  }).catch((error) => {

    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    
  });
}
  logoutcomGoogle(){
    return signOut(this.auth)
  }

  constructor(private auth:Auth) { }

  ngOnInit() {}


  





  }
