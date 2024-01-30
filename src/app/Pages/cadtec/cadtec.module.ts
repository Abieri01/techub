import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadtecPageRoutingModule } from './cadtec-routing.module';

import { CadtecPage } from './cadtec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadtecPageRoutingModule
  ],
  declarations: [CadtecPage]
})
export class CadtecPageModule {}
