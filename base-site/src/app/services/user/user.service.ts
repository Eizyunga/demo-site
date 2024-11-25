import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User, userLogin } from "../../models/user.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  private login(user: userLogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  loginUser(user: userLogin) {
    this.login(user).subscribe(res => {
      if(!!res && !!res.accessToken) {
        localStorage.setItem('access_token', res.accessToken);
      }
    }, error => {

    })
  }
}
