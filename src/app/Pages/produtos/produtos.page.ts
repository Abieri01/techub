import { Component, OnInit } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { NavController } from '@ionic/angular';
import { CarrinhoService } from '../../carrinho.service'; // Ajuste o caminho conforme necessário
import { Produto } from '../../produto.model';
import { ToastController } from '@ionic/angular';
import { ComprasService } from '../../compras.service';







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

  constructor(private storage: Storage, private firestore: Firestore, private navCtrl: NavController, private carrinhoService: CarrinhoService, private toastController: ToastController, public comprasService: ComprasService) {}

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

    const searchTermLowerCase = this.searchCategory.toLowerCase();
  
    if (searchTermLowerCase === 'all') {
      // Se a categoria selecionada for 'Todas', exibe todos os produtos
      this.produtosFiltrados = this.produtos;
    } else {
      // Caso contrário, realiza a filtragem combinada pelo nome e pela categoria
      this.produtosFiltrados = this.produtos.filter((p: Produto) => 
        p.nome.toLowerCase().includes(searchTermLowerCase) ||
        (p.categoria && p.categoria.toLowerCase() === searchTermLowerCase)
      );
    }
  }

  

  formatarDescricao(descricao: string): string {
    // Lógica para formatar a descrição, se necessário
    return descricao;
  }



  comprar() {
    this.comprasService.aumentarCompras();
  }


  irParaCarrinho() {
    this.navCtrl.navigateForward('/carrinho');



  }

  async adicionarAoCarrinho(produto: Produto) {
      this.carrinhoService.adicionarAoCarrinho(produto);
      const toast = await this.toastController.create({
        message: 'Item adicionado ao carrinho!',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      toast.present();
    }
  }





