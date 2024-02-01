import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'perfil',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'produtos',
    loadChildren: () => import('./Pages/produtos/produtos.module').then( m => m.ProdutosPageModule)
  },
  {
    path: 'cad-produtos',
    loadChildren: () => import('./Pages/cad-produtos/cad-produtos.module').then( m => m.CadProdutosPageModule)
  },
  {
    path: 'edit-produtos',
    loadChildren: () => import('./Pages/edit-produtos/edit-produtos.module').then( m => m.EditProdutosPageModule)
  },
  {
    path: 'delete-produtos',
    loadChildren: () => import('./Pages/delete-produtos/delete-produtos.module').then( m => m.DeleteProdutosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'serv-tecnico',
    loadChildren: () => import('./Pages/serv-tecnico/serv-tecnico.module').then( m => m.ServTecnicoPageModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./Pages/carrinho/carrinho.module').then( m => m.CarrinhoPageModule)
  },

  { 
    path: 'cadastro', 
    loadChildren: () => import('./Pages/cadastro/cadastro.module').then(m => m.CadastroPageModule) 
  },
  {
    path: 'pedidos-suporte',
    loadChildren: () => import('./Pages/pedidos-suporte/pedidos-suporte.module').then( m => m.PedidosSuportePageModule)
  },
  {

    path: 'cad-tec',
    loadChildren: () => import('./Pages/cad-tec/cad-tec.module').then( m => m.CadTecPageModule)
  },
  {
    path: 'departamentos',
    loadChildren: () => import('./Pages/departamentos/departamentos.module').then( m => m.DepartamentosPageModule)


  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
