import { VerificationComponent } from "./components/verification/verification.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: '',
    component: VerificationComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class VerificationRoutingModule {}
