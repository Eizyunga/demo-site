import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolioPageComponent } from './components/folio-page/folio-page.component';
import { RouterModule } from "@angular/router";
import { AngularDemoRoutingModule } from "./angular-demo-routing.module";
import { FolioComponent } from './components/folio/folio.component';
import { CreateFolioComponent } from './components/create-folio/create-folio.component';
import { FolioCreateFormComponent } from './components/folio-create-form/folio-create-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CurrencyFormatDirective } from "../../directives/currency-format.directive";
import { MatGridListModule } from "@angular/material/grid-list";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    FolioPageComponent,
    FolioComponent,
    CreateFolioComponent,
    FolioCreateFormComponent,
    ConfirmDialogComponent
  ],
  exports: [
    RouterModule
  ],
  imports: [
    CommonModule,
    AngularDemoRoutingModule,
    ReactiveFormsModule,
    CurrencyFormatDirective,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class AngularDemoModule { }
