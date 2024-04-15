import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MinecraftPageComponent } from "./components/minecraft-page/minecraft-page.component";

const routes: Routes = [
  {
    path: '',
    component: MinecraftPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinecraftRoutingModule { }
