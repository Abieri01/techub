import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosSuportePage } from './pedidos-suporte.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosSuportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosSuportePageRoutingModule {}
