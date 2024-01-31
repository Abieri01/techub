import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosSuportePageRoutingModule } from './pedidos-suporte-routing.module';

import { PedidosSuportePage } from './pedidos-suporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosSuportePageRoutingModule
  ],
  declarations: [PedidosSuportePage]
})
export class PedidosSuportePageModule {}
