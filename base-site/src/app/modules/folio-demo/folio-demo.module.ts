import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolioPageComponent } from './components/folio-page/folio-page.component';
import { RouterModule } from "@angular/router";
import { FolioDemoRoutingModule } from "./folio-demo-routing.module";
import { FolioComponent } from './components/folio/folio.component';
import { CreateFolioComponent } from './components/create-folio/create-folio.component';
import { FolioCreateFormComponent } from './components/folio-create-form/folio-create-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { CurrencyFormatDirective } from "../../directives/currency-format.directive";
import { MatGridListModule } from "@angular/material/grid-list";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

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
    FolioDemoRoutingModule,
    ReactiveFormsModule,
    CurrencyFormatDirective,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class FolioDemoModule { }
