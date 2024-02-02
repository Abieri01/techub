import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CarrinhoService } from '../../carrinho.service';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { ComprasService } from '../../compras.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  mostrarDescricao = false;
  produtos: any = [];
  produtosFiltrados: any = [];

  constructor(private storage: Storage, private carrinhoService: CarrinhoService, private toastController: ToastController, private firestore: Firestore, public comprasService: ComprasService) { }

  ngOnInit() {
  }

  public getItensCarrinho() {
    return this.carrinhoService.getItensCarrinho();
  }

  // Remove o item selecionado do carrinho e exibe um toast de confirmação
  async removerDoCarrinho(index: number) {
    this.carrinhoService.removerItem(index);
    const toast = await this.toastController.create({
      message: 'Item removido do carrinho!',
      duration: 2000,
      position: 'top',
      color: 'danger' // A cor do toast está definida para vermelho
    });
    toast.present();
  }

  


diminuir() {
  this.comprasService.diminuirCompras();
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


}

