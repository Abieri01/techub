import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoObservavelService {
  private pedidoSubject = new Subject<any>();

  emitirNovoPedido(pedido: any) {
    this.pedidoSubject.next(pedido);
  }

  obterNovoPedidoObservable() {
    return this.pedidoSubject.asObservable();
  }
}
