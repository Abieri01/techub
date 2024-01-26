import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { LoginFormComponent } from '../Components/login-form/login-form.component';
import { register } from 'swiper/element/bundle';

register(); 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage, LoginFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FolderPageModule {}
