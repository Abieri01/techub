import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadTecPage } from './cad-tec.page';

const routes: Routes = [
  {
    path: '',
    component: CadTecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadTecPageRoutingModule {}
