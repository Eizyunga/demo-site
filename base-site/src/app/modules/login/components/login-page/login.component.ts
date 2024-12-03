import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from "../../../../services/auth/auth.service";
import { LoginState, User, UserLogin } from "../../../../models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {FolioState} from "../../../../models/folio.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy  {
  loginFormGroup: FormGroup;
  signupFormGroup: FormGroup;
  viewState: string = '';
  isLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.subscriptions.push(this.authService.isLoading$.subscribe((value: boolean): void => {
      this.isLoading = value
    }))

    this.loginFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.signupFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: '',
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.redirectToFolioPage();
    } else {
      this.viewState = LoginState.LOGIN;
    }
  }

  toggleForm(): void {
    this.viewState = this.viewState === LoginState.LOGIN ? LoginState.SIGNUP : LoginState.LOGIN;
  }

  onLogin(): void {
    if (this.loginFormGroup.valid) {
      this.login({
        email: this.loginFormGroup.value.email,
        password: this.loginFormGroup.value.password,
      })
    }
  }

  onSignUp(): void {
    if (this.signupFormGroup.valid) {
      this.signUp({
        firstName: this.signupFormGroup.value.firstName,
        lastName: this.signupFormGroup.value.lastName || '',
        email: this.signupFormGroup.value.email,
        password: this.signupFormGroup.value.password
      })
    }
  }

  private login(user: UserLogin) {
    this.authService.login(user);
  }

  private signUp(user: User) {
    this.authService.signUp(user);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  protected readonly LoginState = LoginState;
}
