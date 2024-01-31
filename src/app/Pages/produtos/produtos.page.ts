import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {
  darkMode = false;
  produtos: any = [];
  produtosFiltrados: any = [];
  searchTerm: string = '';
  searchCategory: string = 'all';
  mostrarDescricao = false;

  constructor(private storage: Storage, private firestore: Firestore, private navCtrl: NavController) {}

  goToProfilePage() {
    this.navCtrl.navigateForward('/carrinho'); // Substitua pelo caminho real do seu perfil
  }

  ngOnInit() {
    this.listarBanco();
  }

  async listarBanco() {
    const querySnapshot = await getDocs(collection(this.firestore, 'Produtos'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()['nome']}`);
      this.produtos = [
        ...this.produtos,
        { nome: doc.data()['nome'], descricao: doc.data()['descricao'], preco: doc.data()['preco'], qtd: doc.data()['qtd'], image: doc.data()['image'] },
      ];
    });

    // Inicialmente, definimos produtosFiltrados como todos os produtos
    this.produtosFiltrados = this.produtos;
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
    switch (this.searchCategory) {
      case 'marca':
        // Implemente a lógica de filtragem por marca
        break;
      case 'tipoHardware':
        // Implemente a lógica de filtragem por tipo de hardware
        break;
      case 'precoAbove':
        // Implemente a lógica de filtragem por preço acima
        break;
      case 'precoBelow':
        // Implemente a lógica de filtragem por preço abaixo
        break;
      default:
        // Todas as outras categorias ou 'all' mostrarão todos os produtos
        this.produtosFiltrados = this.produtos;
        break;
    }
  }
  formatarDescricao(descricao: string): string {
    // Lógica para formatar a descrição, se necessário
    return descricao;
  }

  compras:number=0
  comprar(produto: any){
    this.compras++
  }


}
