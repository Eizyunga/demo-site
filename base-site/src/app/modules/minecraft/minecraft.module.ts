import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinecraftPageComponent } from './components/minecraft-page/minecraft-page.component';
import { RouterModule } from "@angular/router";
import { MinecraftRoutingModule } from "./minecraft-routing.module";



@NgModule({
  declarations: [
    MinecraftPageComponent
  ],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    MinecraftRoutingModule

  ]
})
export class MinecraftModule { }
