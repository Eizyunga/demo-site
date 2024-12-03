import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../../services/auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnDestroy {
  verifyFormGroup: FormGroup;
  isLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.subscriptions.push(this.authService.isLoading$.subscribe((value: boolean) => {
      this.isLoading = value;
    }));
    this.verifyFormGroup = this.fb.group({
      password: ['', Validators.required]
    })
  }

  sendEmail(): void {
    this.authService.sendVerificationEmail();
  }

  onVerify(): void {
    if (this.verifyFormGroup.valid) {
      this.authService.verifyUser(this.verifyFormGroup.controls['password'].value);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
