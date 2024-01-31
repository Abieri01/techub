import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { NavController, ToastController } from '@ionic/angular';
import { __setFunctionName } from 'tslib';

@Component({
  selector: 'app-cad-tec',
  templateUrl: './cad-tec.page.html',
  styleUrls: ['./cad-tec.page.scss'],
})
export class CadTecPage {

  constructor(private auth: Auth, private firestore: Firestore, private navCtrl: NavController, private toastController: ToastController) { }
 
async cadTec(nome: any, sobrenome: any, sexo: any,  nascimento: any, cpf: any, telefone: any, cep: any,
  endereco: any, habilidades: any, empregosAnteriores: any, tempoExperiencia: any, nivelEducacao: any,
  horariosDisponiveis: any) {
    const docRef = await addDoc(collection(this.firestore, 'tecnicos'), {
        uid: sessionStorage.getItem('uid'),
        email: sessionStorage.getItem('email'),
        nome: nome,
        sobrenome: sobrenome,
        sexo: sexo,
        nascimento: nascimento,
        cpf: cpf,
        telefone: telefone,
        cep: cep,
        endereco: endereco,
        habilidades: habilidades,
        empregosAnteriores: empregosAnteriores
        tempoExperiencia: tempoExperiencia
        nivelEducacao: nivelEducacao
        horariosDisponiveis: horariosDisponiveis
        
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
