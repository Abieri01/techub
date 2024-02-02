import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

interface Tecnico {
  nome: string;
  habilidades: string;
  avaliacao: number;
  tempoExperiencia: string;
  horariosDisponiveis: string;
  telefone: string;
  email: string;
  categoria: string; // Certifique-se de ter a propriedade 'categoria'
}

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
  selectedTime: string = '';
  currentDate: string = new Date().toISOString();
  tecnicos: any[] = [];
  searchCategory: string = 'all';
  tecnicosFiltrados: any = [];
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
    const searchTermLowerCase = this.searchCategory.toLowerCase();

    if (searchTermLowerCase === 'all') {
      // Se a categoria selecionada for 'Todas', exibe todos os tecnicos
      this.tecnicosFiltrados = this.tecnicos;
    } else {
      // Caso contrário, realiza a filtragem combinada pelo nome e pela categoria
      this.tecnicosFiltrados = this.tecnicos.filter((p: Tecnico) => 
        p.habilidades.toLowerCase().includes(searchTermLowerCase) ||
        (p.categoria && p.categoria.toLowerCase() === searchTermLowerCase)
      );
    }
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
