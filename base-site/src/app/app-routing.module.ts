import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',
    loadChildren: () => import('./modules/main-page/main-page.module').then(m => m.MainPageModule)
  },
  {
    path: 'minecraft',
    loadChildren: () => import('./modules/minecraft/minecraft.module').then(m => m.MinecraftModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
