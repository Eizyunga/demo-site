import { NgModule } from "@angular/core";
import { VerificationComponent } from "./components/verification/verification.component";
import { VerificationRoutingModule } from "./verification-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    VerificationComponent
  ],
  imports: [
    VerificationRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
  ]
})
export class VerificationModule {}
