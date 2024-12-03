import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login-page/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
    MatProgressSpinnerModule,
  ],
})
export class LoginModule {}
