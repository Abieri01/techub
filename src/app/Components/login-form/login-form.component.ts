import { Component, OnInit} from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  cad: boolean = false
  mensagem: string = ''
  logado: boolean = false
  isToastOpen = false
  user:any={nome:'',foto:''}
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  cadUser(email: any, senha: any, rpSenha: any) {
    this.mensagem = ''
    if (email == '' || senha == '' || rpSenha == '') {
      this.mensagem = 'Preencha todos os campos do formulário!'
      this.setOpen(true)
    } else if (senha != rpSenha) {
      this.mensagem = 'As senhas precisam ser iguas!'
      this.setOpen(true)
    } else {
      this.mensagem = 'Usuário cadastrado com sucesso!'
      this.setOpen(true)
      this.cad = !this.cad

      createUserWithEmailAndPassword(this.auth, email, senha)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          // ...
          // Adicione a mensagem de sucesso
        this.mensagem = 'Cadastro realizado com sucesso!';
        this.setOpen(true);

        // Navegue para a página /perfil após o cadastro bem-sucedido
        this.navCtrl.navigateForward('/cadastro');
      })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }

  }

  Logar(email: any, senha: any) {
    signInWithEmailAndPassword(this.auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email)
        this.mensagem = `Usuário: ${user.email} logado com sucesso!`
        this.setOpen(true)
        this.logado = !this.logado
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logout() {
    this.mensagem = 'LogOut efetuado com sucesso!'
    this.setOpen(true)
    this.logado = !this.logado
    this.logOutComGoogle()
  }
  loginComGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this.mensagem = `Usuário: ${result.user.displayName} logado com sucesso!`
        this.user.nome=result.user.displayName
        this.user.foto=result.user.photoURL
        this.setOpen(true)
        this.logado = !this.logado
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  logOutComGoogle(){
    return signOut(this.auth)
  }

  public alertButtons = [
    {
      text: 'Não',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Sim',
      cssClass: 'alert-button-confirm',
    },
    
  ];
  

  constructor(private auth: Auth, private navCtrl: NavController) { }

  ngOnInit() { }

}





