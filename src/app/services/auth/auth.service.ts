import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel, SignupModel } from 'src/app/auth/auth.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://localhost:4000/api";

  constructor(
    private httpClient: HttpClient
  ) { }


  public userRegistration(data:SignupModel) {
    return this.httpClient.post<any>(this.baseUrl + '/register', data)
      .pipe(map(Users => {
        return Users;
      }));
  }

  public userLogin(data:LoginModel) {
    return this.httpClient.post<any>(this.baseUrl + '/login', data)
      .pipe(map(res => {
        return res;
      }));
  }

  // public logout() {
  //   this.cookieService.deleteCookie('user', '/');
  // }

  // public isLoggedIn() {
  //   return this.cookieService.checkCookie('user');
  // }

  // public isLoggedOut() {
  //   return !this.cookieService.checkCookie('user');
  // }
}
