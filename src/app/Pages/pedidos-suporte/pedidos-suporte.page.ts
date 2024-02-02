import { Component, OnInit } from '@angular/core';
import { PedidoObservavelService } from 'src/app/pedido-observavel.service';
import { PedidosService } from '../pedidos.service';


@Component({
  selector: 'app-pedidos-suporte',
  templateUrl: './pedidos-suporte.page.html',
  styleUrls: ['./pedidos-suporte.page.scss'],
})
export class PedidosSuportePage implements OnInit {
  pedidos: any[] = [];

  constructor(
    private pedidosService: PedidosService,
    private pedidoObservavelService: PedidoObservavelService
  ) {}

  ngOnInit() {
    this.pedidos = this.pedidosService.getPedidos();

    // Inscreva-se no evento de novo pedido
    this.pedidoObservavelService.obterNovoPedidoObservable().subscribe((novoPedido) => {
      this.pedidos.push(novoPedido);
    });
  }
}
