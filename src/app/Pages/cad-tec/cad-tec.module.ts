import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadTecPageRoutingModule } from './cad-tec-routing.module';

import { CadTecPage } from './cad-tec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadTecPageRoutingModule
  ],
  declarations: [CadTecPage]
})
export class CadTecPageModule {}
