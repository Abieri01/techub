import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';

import { Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  cad: boolean = false;
  mensagem: string = '';
  logado: boolean = false;
  isToastOpen = false;
  user: any = { nome: '', foto: '' };

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  constructor(private auth: Auth, private navCtrl: NavController, private firestore: AngularFirestore) { }


  cadUser(email: any, senha: any, rpSenha: any) {
    this.mensagem = '';

    if (email == '' || senha == '' || rpSenha == '') {
      this.mensagem = 'Preencha todos os campos do formulário!';
      this.setOpen(true);
    } else if (senha != rpSenha) {
      this.mensagem = 'As senhas precisam ser iguais!';
      this.setOpen(true);
    } else {
      createUserWithEmailAndPassword(this.auth, email, senha)
        .then((userCredential) => {
          const userId = userCredential.user.uid;

          // Informações do usuário para serem armazenadas no Firestore
          const userInfo = {
            nome: "Nome do usuário",
            // Adicione outros campos conforme necessário
          };

          // Armazena as informações do usuário no Firestore
          this.firestore.collection("usuarios").doc(userId).set(userInfo)
            .then(() => {
              console.log("Informações do usuário armazenadas no Firestore com sucesso.");

              // Define a mensagem de sucesso
              this.mensagem = 'Cadastro realizado com sucesso!';
              this.setOpen(true);

              // Navega para a página /perfil após o cadastro bem-sucedido
              this.navCtrl.navigateForward('/cadastro');
            })
            .catch((error: any) => {
              console.error("Erro ao armazenar informações do usuário no Firestore:", error);
            });
            
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Erro ao criar usuário no Firebase Authentication:", error);
        });
    }
  }

  Logar(email: any, senha: any) {
    signInWithEmailAndPassword(this.auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);

        // Define a mensagem de sucesso
        this.mensagem = `Usuário: ${user.email} logado com sucesso!`;
        this.setOpen(true);

        // Define as informações do usuário para exibição
        this.user.nome = user.email; // Substitua pelo campo correto do usuário
        this.user.foto = ''; // Substitua pelo campo correto do usuário

        // Define o estado de logado
        this.logado = true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  logout() {
    // Define a mensagem de sucesso
    this.mensagem = 'LogOut efetuado com sucesso!';
    this.setOpen(true);

    // Define o estado de logado
    this.logado = false;

    // Realiza o logOut com o Google
    this.logOutComGoogle();
  }

  loginComGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        // Define a mensagem de sucesso
        this.mensagem = `Usuário: ${result.user.displayName} logado com sucesso!`;

        // Define as informações do usuário para exibição
        this.user.nome = result.user.displayName;
        this.user.foto = result.user.photoURL;

        this.setOpen(true);

        // Define o estado de logado
        this.logado = true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  logOutComGoogle() {
    return signOut(this.auth);
  }

  ngOnInit() { }

}
