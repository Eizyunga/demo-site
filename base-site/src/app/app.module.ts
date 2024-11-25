import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from "./modules/main-page/main-page.module";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainPageModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
