import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  email: string = '';
  uid: string = '';
  cad: boolean = false;
  cadPessoal: boolean = false;
  mensagem: string = '';
  logado: boolean = false;
  isToastOpen = false;
  user: any = { nome: '', foto: '' };
  nome: string = '';
  sobrenome: string = '';
  sexo: string = '';
  cpf: string = '';
  nascimento: string = '';
  telefone: string = '';
  cep: string = '';
  rua: string = '';
  numero: string = '';
  complemento: string = '';
  referencia: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';
  endereco: string= '';
  habilidades: string= '';
  empregosAnteriores: string= '';
  tempoExperiencia: string= '';
  nivelEducacao: string= '';
  horariosDisponiveis: string= '';
  cadt: boolean = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  cadUser(email: any, senha: any, rpSenha: any) {
    this.mensagem = '';
    if (email == '' || senha == '' || rpSenha == '') {
      this.mensagem = 'Preencha todos os campos do formulário!';
      this.setOpen(true);
    } else if (senha != rpSenha) {
      this.mensagem = 'As senhas precisam ser iguais!';
      this.setOpen(true);
    } else {
      this.mensagem = 'Usuário cadastrado com sucesso!';
      this.setOpen(true);
      
      
      createUserWithEmailAndPassword(this.auth, email, senha)
        .then((userCredential) => {
          console.log('test1')
          const user = userCredential.user;
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('uid', user.uid);
          this.uid = user.uid;
          this.email = email
          this.mensagem = 'Cadastro realizado com sucesso!';


          this.setOpen(true);
          if(this.cad){
          this.cad = !this.cad;
          this.navCtrl.navigateForward('/cadastro');
          }else{
            this.cadt = !this.cadt;
          this.navCtrl.navigateForward('/cad-tec');
          }
          //this.salvarNoFirestore();  // Chame a função de salvar no Firestore
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Erro ao cadastrar: ', errorMessage);
        });
    }
  }

  cadTec(email: any, senha: any, rpSenha: any) {
    this.mensagem = '';
    if (email == '' || senha == '' || rpSenha == '') {
      this.mensagem = 'Preencha todos os campos do formulário!';
      this.setOpen(true);
    } else if (senha != rpSenha) {
      this.mensagem = 'As senhas precisam ser iguais!';
      this.setOpen(true);
    } else {
      this.mensagem = 'Usuário cadastrado com sucesso!';
      this.setOpen(true);
      this.cadt = !this.cadt;
      createUserWithEmailAndPassword(this.auth, email, senha)
        .then((userCredential) => {
          console.log('test1')
          const usertec = userCredential.user;
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('uid', usertec.uid);
          this.uid = usertec.uid;
          this.email = email
          this.mensagem = 'Cadastro realizado com sucesso!';
          this.setOpen(true);
          this.navCtrl.navigateForward('/cad-tec');
          if(this.cad){
          this.cad = !this.cad;
          this.navCtrl.navigateForward('/cadastro');
          }else{
            this.cadt = !this.cadt;
          this.navCtrl.navigateForward('/cad-tec');
          }
          //this.salvarNoFirestore();  // Chame a função de salvar no Firestore
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Erro ao cadastrar: ', errorMessage);
        });
    }
  }

  cadTec(email: any, senha: any, rpSenha: any) {
    this.mensagem = '';
    if (email == '' || senha == '' || rpSenha == '') {
      this.mensagem = 'Preencha todos os campos do formulário!';
      this.setOpen(true);
    } else if (senha != rpSenha) {
      this.mensagem = 'As senhas precisam ser iguais!';
      this.setOpen(true);
    } else {
      this.mensagem = 'Usuário cadastrado com sucesso!';
      this.setOpen(true);
      this.cadt = !this.cadt;
      createUserWithEmailAndPassword(this.auth, email, senha)
        .then((userCredential) => {
          console.log('test1')
          const usertec = userCredential.user;
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('uid', usertec.uid);
          this.uid = usertec.uid;
          this.email = email
          this.mensagem = 'Cadastro realizado com sucesso!';
          this.setOpen(true);
          this.navCtrl.navigateForward('/cad-tec');
          //this.salvarNoFirestore();  // Chame a função de salvar no Firestore
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Erro ao cadastrar: ', errorMessage);
        });
    }
  }
  Logar(email: any, senha: any) {
    signInWithEmailAndPassword(this.auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
        this.mensagem = `Usuário: ${user.email} logado com sucesso!`;
        this.setOpen(true);
        this.logado = !this.logado;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Erro ao logar: ', errorMessage);
      });
  }

  logout() {
    this.mensagem = 'LogOut efetuado com sucesso!';
    this.setOpen(true);
    this.logado = !this.logado;
    this.logOutComGoogle();
  }

  loginComGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        this.mensagem = `Usuário: ${result.user.displayName} logado com sucesso!`;
        this.user.nome = result.user.displayName;
        this.user.foto = result.user.photoURL;
        this.setOpen(true);
        this.logado = !this.logado;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Erro ao logar com Google: ', errorMessage);
      });
  }
  logOutComGoogle() {
    return signOut(this.auth);
  }



  public alertButtons = [
    {
      text: 'Não',
      cssClass: 'alert-button-cancel',
      handler: () => {
      },
    },
    {
      text: 'Sim',
      cssClass: 'alert-button-confirm',
      handler: () => {
        this.logout();

      },
    }
  ];

  trocaLogin() {
    if (this.cad)
      this.cad = !this.cad
    if (this.cadt)
      this.cadt = !this.cadt
  }


    },
  }
  ];


  
  
  
  constructor(private auth: Auth, private firestore: Firestore, private navCtrl: NavController) { }

  ngOnInit() { }
}
