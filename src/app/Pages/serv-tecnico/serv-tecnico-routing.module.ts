import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServTecnicoPage } from './serv-tecnico.page';

const routes: Routes = [
  {
    path: '',
    component: ServTecnicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServTecnicoPageRoutingModule {}
