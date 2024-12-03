import {inject, Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  isLoading$: Subject<boolean> = new Subject<boolean>();
  protected router: Router = inject(Router);

  constructor() { }

  protected setLoading(value: boolean) {
    console.log('setting ', value);
    this.isLoading$.next(value);
  }

  protected redirectToHomePage(): void {
    this.router.navigate(['']);
  }

  // This is redundant. Will look into a better way to handle later
  protected redirectToLoginPage(): void {
    this.removeAuthToken();
    this.router.navigate(['/login']);
  }

  protected removeAuthToken(): void {
    console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
  }
}
