import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

import { Auth } from '@angular/fire/auth';
import { PedidosService } from '../pedidos.service';

interface Tecnico {
  nome: string;
  habilidades: string;
  avaliacao: number;
  tempoExperiencia: string;
  horariosDisponiveis: string;
  telefone: string;
  email: string;
  categoria: string; // Certifique-se de ter a propriedade 'categoria'
  image: string;
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
  descricaoModal: string = '';
  dataModal: string = '';
  horaModal: string = '';
  pedidos: any[] = [];

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private firestore: Firestore,
    private auth: Auth,
    private pedidosService: PedidosService
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
          image: doc.data()['image'] },
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

  hasMatchingSkill(tecnico: any): boolean {
    // Verifica se a habilidade do técnico contém a categoria de pesquisa
    return tecnico.habilidades.toLowerCase().includes(this.searchCategory.toLowerCase());
  }

    
  async fazerPedido(descricao: any, data: any, hora: any) {
    try {
      console.log('Valores recebidos:', descricao, data, hora);
      const user = this.auth.currentUser;

      if (user) {
        const uid = (await this.auth.currentUser)?.uid;
        
        const docRef = await addDoc(collection(this.firestore, 'pedidosTec'), {
          
          uidTecnico: uid,
          descricao: descricao,
          data: data,
          hora: hora,
        });

        this.pedidosService.adicionarPedido({
          descricao: descricao,
          data: data,
          hora: hora,
        });
        
        console.log('Pedido salvo no banco de dados');

        const toast = await this.toastController.create({
          message: 'Pedido realizado com sucesso!',
          duration: 3000,
        });

        await toast.present();

        // Restante do código, se necessário...
      } else {
        console.error('Usuário não está autenticado');
      }
    } catch (error) {
      console.error('Erro ao fazer pedido: ', error);
    }

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