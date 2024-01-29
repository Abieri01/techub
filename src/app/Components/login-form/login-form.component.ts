import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { AngularFirestore, addDoc, collection } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  uid: string = '';
  cad: boolean = false;
  cadPessoal: boolean = false; // Added flag for personal information form
  mensagem: string = '';
  logado: boolean = false;
  isToastOpen = false;
  user: any = { nome: '', foto: '' };
  nome: string = ''; // Added properties for personal information
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
      const user = userCredential.user;

      // Obtendo a UID do usuário cadastrado
      const uid = user.uid;

      // Adicione a mensagem de sucesso
      this.mensagem = 'Cadastro realizado com sucesso!';
      this.setOpen(true);

      // Armazene a UID para uso posterior
      this.uid = uid;

      // Navegue para a página /cadastro após o cadastro bem-sucedido
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


  cadastrarPessoal() {
    console.log('Personal information submitted:', {
      nome: this.nome,
      sobrenome: this.sobrenome,
      sexo: this.sexo,
      cpf: this.cpf,
      nascimento: this.nascimento,
      telefone: this.telefone,
      cep: this.cep,
      rua: this.rua,
      numero: this.numero,
      complemento: this.complemento,
      referencia: this.referencia,
      bairro: this.bairro,
      cidade: this.cidade,
      estado: this.estado,
    });
    // Função para salvar no Firestore
  const salvarNoFirestore = async () => {
    try {
      const docRef = await addDoc(collection(this.firestore, 'usuarios'), {
        uid: this.uid,
        nome: this.nome,
        sobrenome: this.sobrenome,
        sexo: this.sexo,
        cpf: this.cpf,
        nascimento: this.nascimento,
        telefone: this.telefone,
        cep: this.cep,
        rua: this.rua,
        numero: this.numero,
        complemento: this.complemento,
        referencia: this.referencia,
        bairro: this.bairro,
        cidade: this.cidade,
        estado: this.estado,
        // Adicione mais campos conforme necessário
      });

      console.log('Documento salvo com ID: ', docRef.id);
    } catch (e) {
      console.error('Erro ao salvar no Firestore: ', e);
    }
  };

  // Chame a função de salvar no Firestore
  salvarNoFirestore();

  }

  constructor(private auth: Auth, private firestore: AngularFirestore, private navCtrl: NavController) { }

  ngOnInit() { }
}
