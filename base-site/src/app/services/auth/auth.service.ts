import { Injectable } from '@angular/core';
import { CommonService } from "../common/common.service";
import { OTP, User, UserDetails, UserLogin } from "../../models/user.model";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  accountStatus: 'active' | 'inactive';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CommonService {

  userDetails$: Subject<UserDetails> = new Subject<UserDetails>();
  redirectUrl: string = '';
  private apiUrl: string = 'http://localhost:3000/api/v1/user';
  private folioPageLink: string = '/folio-demo';

  constructor(private http: HttpClient) {
    super();
  }

  redirectToFolioPage(): void {
    this.router.navigate([this.folioPageLink]);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isVerified(): boolean {
    // I'm sure this could be done as a 1-liner
    const details: JwtPayload = jwtDecode(localStorage.getItem('token') || '');
    console.log(details);
    return details.accountStatus === 'active';
  }

  private loginUser(user: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  private signUpUser(user: UserLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  private sendEmail(): Observable<any> {
    return this.http.post(`${this.apiUrl}/verification`, {});
  }

  private verify(otp: OTP): Observable<any> {
    console.log('or here');
    return this.http.post(`${this.apiUrl}/verify`, {pass: otp});
  }

  verifyUser(otp: OTP): void {
    console.log('value is ' + otp);
    this.setLoading(true);
    this.verify(otp).subscribe({
      next: (res): void => {
        if (res) {
          this.removeAuthToken();
          this.storeToken(res);
          this.setLoading(false);
          this.redirectToFolioPage();
        }
      },
      error: (error): void => {
        this.setLoading(false);
      },
    })
  }

  sendVerificationEmail(): void {
    this.setLoading(true);
    this.sendEmail().subscribe({
      next: () => {
        this.setLoading(false);
      },
      error: (): void => {
        this.setLoading(false);
      }
    })
  }

  logout(): void {
    this.removeAuthToken();
    this.router.navigate(['/login']);
  }

  private storeToken(res: { accessToken: string; }): void {
    if(!!res && !!res.accessToken) {
      localStorage.setItem('token', res.accessToken);
    }
  }

  login(user: UserLogin): void {
    this.setLoading(true);
    this.loginUser(user).subscribe({
      next: (res): void => {
        this.storeToken(res);
        this.setLoading(false);
      },
      error: (error): void => {
        this.setLoading(false);
      }, complete: (): void => {
        this.setLoading(false);
        //TODO - clean this up
        this.router.navigateByUrl(this.redirectUrl || '/folio-demo');
      }
    });
  }

  signUp(user: User): void {
    this.setLoading(true);
    this.signUpUser(user).subscribe({
      next: (res): void => {
        this.storeToken(res);
        this.router.navigateByUrl('verify');
      },
      error: (err) => {
        this.setLoading(false);
      },
      complete: (): void => {
        this.setLoading(false);
      }
    })
  }
}
