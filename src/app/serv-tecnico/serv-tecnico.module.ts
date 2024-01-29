import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServTecnicoPageRoutingModule } from './serv-tecnico-routing.module';

import { ServTecnicoPage } from './serv-tecnico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServTecnicoPageRoutingModule
  ],
  declarations: [ServTecnicoPage]
})
export class ServTecnicoPageModule {}
