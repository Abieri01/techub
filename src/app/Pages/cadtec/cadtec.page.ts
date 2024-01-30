import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadtec',
  templateUrl: './cadtec.page.html',
  styleUrls: ['./cadtec.page.scss'],
})
export class CadtecPage  {

  constructor(private auth: Auth, private firestore: Firestore, private navCtrl: NavController, private toastController: ToastController) { }
 
  async cadtec(nome: any, sobrenome: any, sexo: any, cpf: any, nascimento: any, telefone: any, cep: any, rua: any, numero: any, complemento: any, referencia: any, bairro: any, cidade: any, estado: any) {
      const docRef = await addDoc(collection(this.firestore, 'tecnicos'), {
          uid: sessionStorage.getItem('uid'),
          email: sessionStorage.getItem('email'),
          nome: nome,
          sobrenome: sobrenome,
          sexo: sexo,
          cpf: cpf,
          nascimento: nascimento,
          telefone: telefone,
          cep: cep,
          rua: rua,
          numero: numero,
          complemento: complemento,
          referencia: referencia,
          bairro: bairro,
          cidade: cidade,
          estado: estado,
        });
        console.log('Documento salvo com ID: ', docRef.id);
      // Implemente a lógica de cadastro, como enviar para um servidor ou salvar localmente.
      const toast = await this.toastController.create({
        message: 'Cadastro realizado com sucesso!',
        duration: 3000, // tempo de exibição do toast em milissegundos
        position: 'bottom' // posição do toast na tela
      });
      toast.present();
  
      // Redirecionar para a página /perfil
      this.navCtrl.navigateForward('/perfil');
    }
  
  }
  