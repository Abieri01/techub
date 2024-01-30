import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadtecPage } from './cadtec.page';

const routes: Routes = [
  {
    path: '',
    component: CadtecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadtecPageRoutingModule {}
