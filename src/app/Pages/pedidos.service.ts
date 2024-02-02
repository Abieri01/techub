import { Injectable } from '@angular/core';
import { PedidoObservavelService } from '../pedido-observavel.service'

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private pedidos: any[] = [];

  constructor(private pedidoObservavelService: PedidoObservavelService) {}

  getPedidos() {
    return this.pedidos;
  }

  adicionarPedido(pedido: any) {
    this.pedidos.push(pedido);
    this.pedidoObservavelService.emitirNovoPedido(pedido);
  }
}
