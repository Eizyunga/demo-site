import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./modules/main-page/main-page.module').then(m => m.MainPageModule)
  },
  {
    path: 'minecraft',
    loadChildren: () => import('./modules/minecraft/minecraft.module').then(m => m.MinecraftModule)
  },
  {
    path: 'folio-demo',
    loadChildren: () => import('./modules/folio-demo/angular-demo.module').then(m => m.AngularDemoModule)
  },
  {
    path: 'user-demo',
    loadChildren: () => import('./modules/user-demo/user-demo.module').then(m => m.UserDemoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
