import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './components/page/page.component';
import { MainPageRoutingModule } from "./main-page-routing.module";



@NgModule({
  declarations: [
    PageComponent
  ],
  exports: [
    PageComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
  ]
})
export class MainPageModule { }
