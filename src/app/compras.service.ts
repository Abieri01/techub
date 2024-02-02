import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  compras: number = 0;

  aumentarCompras() {
    this.compras++;
  }

  diminuirCompras() {
    if (this.compras > 0) {
      this.compras--;
    }
  }
}