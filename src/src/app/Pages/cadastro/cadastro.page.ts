import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
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
  mensagem: string = '';
  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  async cadastrar() {
    // Adicione aqui a lógica para cadastrar o usuário
    console.log('Nome:', this.nome);
    console.log('Sobrenome:', this.sobrenome);
    console.log('Sexo:', this.sexo);
    console.log('CPF:', this.cpf);
    console.log('Nascimento:', this.nascimento);
    console.log('Telefone:', this.telefone);
    console.log('CEP:', this.cep);
    console.log('Rua:', this.rua);
    console.log('Número:', this.numero);
    console.log('Complemento:', this.complemento);
    console.log('Referência:', this.referencia);
    console.log('Bairro:', this.bairro);
    console.log('Cidade:', this.cidade);
    console.log('Estado:', this.estado);
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
