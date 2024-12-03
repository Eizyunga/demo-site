import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, VerifyGuard } from "./guards/auth.guard";

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
    loadChildren: () => import('./modules/folio-demo/folio-demo.module').then(m => m.FolioDemoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./modules/verification/verification.module').then(m => m.VerificationModule),
    canActivate: [VerifyGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
