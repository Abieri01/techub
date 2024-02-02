import { Injectable } from '@angular/core';
import { Produto } from './produto.model';


type ProdutoCarrinho = Produto;

interface ItemCarrinho {
  produto: ProdutoCarrinho;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itensCarrinho: ItemCarrinho[] = [];

  constructor() { }

  adicionarAoCarrinho(produto: ProdutoCarrinho) {
    const itemExistente = this.itensCarrinho.find(item => item.produto.nome === produto.nome);
    if (itemExistente) {
      itemExistente.quantidade += produto.qtd;
    } else {
      this.itensCarrinho.push({ produto, quantidade: produto.qtd });
    }
    // Reseta a quantidade do produto após adicioná-lo ao carrinho
    produto.qtd = 0;
  }

  removerItem(index: number) {
    this.itensCarrinho.splice(index, 1);
  }

  getItensCarrinho() {
    return this.itensCarrinho;
  }

  // Aqui você pode adicionar outros métodos que achar necessário
}