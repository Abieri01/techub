import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
  tecnicos = [
    {
      nome: 'Matheus Abade',
      profissao: 'Manutenção de Computadores',
      descricao: 'Formatação, montagem e limpeza de computadores',
      diasAtendimento: 'Segunda a sábado',
      horarioAtendimento: '8:00 - 18:00',
      custoServico: 'R$ 250,00',
      avaliacao: 4.8,
      hasAlertShown: false, // Nova propriedade
    },
    {
      nome: 'Vitor Albuquerque',
      profissao: 'Instalação de cabo de internet',
      descricao: 'Realiza serviços de instalação de internet, conectorização e passagem dos cabos.',
      diasAtendimento: 'Segunda a sabado',
      horarioAtendimento: '8:00 - 18:00',
      custoServico: 'R$ 250,00',
      avaliacao: 4.8,
      hasAlertShown: false, // Nova propriedade
    },
    {
      nome: 'Patrick Braz',
      profissao: 'Manutenção e reparo de hardwares',
      descricao: 'Realiza o reparo e manutenção envolvendo de peças de hardwares',
      diasAtendimento: 'Segunda a sábado',
      horarioAtendimento: '10:00 - 20:00',
      custoServico: 'R$ 250,00',
      avaliacao: 4.8,
      hasAlertShown: false, // Nova propriedade
    },
    {
      nome: 'Leonardo Abieri',
      profissao: 'Manutenção e reparo de hardwares / Manutenção de Computadores',
      descricao: 'Realiza o reparo e manutenção envolvendo de peças de hardwares / Realiza o reparo e manutenção envolvendo de peças de hardwares',
      diasAtendimento: 'Segunda a sábado',
      horarioAtendimento: '08:00 - 20:00',
      custoServico: 'R$ 250,00',
      avaliacao: 4.8,
      hasAlertShown: false, // Nova propriedade
    },
    {
      nome: 'Pedro Cachaça',
      profissao: 'Manutenção e reparo de hardwares',
      descricao: 'Realiza o reparo e manutenção envolvendo de peças de hardwares',
      diasAtendimento: 'Segunda a sabado',
      horarioAtendimento: '10:00 - 20:00',
      custoServico: 'R$ 200,00',
      avaliacao: 3.9,
      hasAlertShown: false, // Nova propriedade
    },
    

  ];
  searchResults: any[] = [];

  constructor(private navCtrl: NavController) {}

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    this.checkAppMode();
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
        return tecnico.avaliacao > 4;
      } else if (this.searchCategory === 'below3stars') {
        return tecnico.avaliacao <= 4;
      } else {
        return (
          (this.searchCategory === 'all' || tecnico.descricao.toLowerCase().includes(this.searchCategory.toLowerCase())) &&
          (tecnico.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            tecnico.descricao.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            tecnico.custoServico.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        );
      }
    });
  }

  contratar(tecnico: any) {
    // Adicione uma verificação para garantir que a caixa de alerta só seja mostrada uma vez para cada técnico
    if (!tecnico.hasAlertShown) {
      tecnico.hasAlertShown = true;
      this.setOpen(true);
    }
  }

  getStars(aval: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= aval ? 'star' : 'star-outline');
    }
    return stars;
  }

}
