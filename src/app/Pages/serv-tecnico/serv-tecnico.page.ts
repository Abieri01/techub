import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-serv-tecnico',
  templateUrl: './serv-tecnico.page.html',
  styleUrls: ['./serv-tecnico.page.scss'],
})
export class ServTecnicoPage implements OnInit {
  darkMode = false;
  isAlertOpen = false;
  alertButtons = ['Fechar'];
  searchTerm: string = '';
  searchCategory: string = 'all';
  selectedTime: string = '';
  currentDate: string = new Date().toISOString();
  tecnicos: any[] = [];
  tecnicosFiltrados: any[] = [];
  searchResults: any[] = [];

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private firestore: Firestore,
  ) {}

  isModalOpen = false;

  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, 'tecnicos'));

    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['nome']}`);
      this.tecnicos = [
        ...this.tecnicos,
        {
          nome: doc.data()['nome'],
          sobrenome: doc.data()['sobrenome'],
          habilidades: doc.data()['habilidades'],
          email: doc.data()['email'],
          horariosDisponiveis: doc.data()['horariosDisponiveis'],
          tempoExperiencia: doc.data()['tempoExperiencia'],
          telefone: doc.data()['telefone'],
        },
      ];
    });

    // Inicialmente, definimos tecnicosFiltrados como todos os tecnicos
    this.tecnicosFiltrados = this.tecnicos;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.checkAppMode();
    this.listarBanco();
    this.filterItems();
  }

  checkAppMode() {
    const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    this.darkMode = checkIsDarkMode === 'true';
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    localStorage.setItem('darkModeActivated', this.darkMode.toString());
  }

  filterItems() {
    this.searchResults = this.tecnicos.filter((tecnico) => {
      if (this.searchCategory === 'above3stars') {
        // Lógica para filtrar técnicos com avaliação acima de 4 estrelas
        return this.getAverageRating(tecnico) > 4;
      } else if (this.searchCategory === 'below3stars') {
        // Lógica para filtrar técnicos com avaliação 4 estrelas ou abaixo
        return this.getAverageRating(tecnico) <= 4;
      } else {
        // Lógica para filtrar técnicos com habilidades correspondentes à categoria de pesquisa
        return (
          (this.searchCategory === 'all' || this.hasMatchingSkill(tecnico)) &&
          (tecnico.nome.toLowerCase().includes(this.searchTerm.toLowerCase()))
        );
      }
    });
  }
  
  hasMatchingSkill(tecnico: any): boolean {
    // Verifica se a habilidade do técnico contém a categoria de pesquisa
    return tecnico.habilidades.toLowerCase().includes(this.searchCategory.toLowerCase());
  }
  
  async fazerPedido(descricao: any, data: any, hora: any) {
    const docRef = await addDoc(collection(this.firestore, 'pedidosTec'), {
      descricao: descricao,
      data: data,
      hora: hora,
    });
    console.log('Salvo no banco de dados');
    const toast = await this.toastController.create({
      message: 'Pedido realizado com sucesso!',
      duration: 3000,
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Pedido foi realizado!',
      duration: 2000,
      position: 'bottom',
      color: 'success',
      buttons: [
        {
          text: 'Fechar',
          role: 'cancel',
        },
      ],
    });
    await toast.present();
  }

  getStars(aval: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= aval ? 'star' : 'star-outline');
    }
    return stars;
  }

  private getAverageRating(tecnico: any): number {
    // Implemente a lógica para calcular a avaliação média do técnico (se aplicável)
    // Se não houver lógica específica, retorne uma avaliação padrão.
    return 0;
  }
}
