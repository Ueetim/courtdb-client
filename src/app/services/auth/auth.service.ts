import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel, SignupModel, User } from 'src/app/auth/auth.model';
import { map } from 'rxjs/operators';
import { CookieServices } from '../cookie.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = "http://localhost:4000/api";

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieServices
  ) { }

  
// const headers= new HttpHeaders()
//   .set('content-type', 'application/json')
//   .set('Access-Control-Allow-Origin', '*');


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

  public getUser() {
    return this.httpClient.get<any>(this.baseUrl + '/user', { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public logout() {
    this.cookieService.deleteCookie('jwt', '/');
  }

  public isLoggedIn() {
    return this.cookieService.checkCookie('jwt');
  }

  public isLoggedOut() {
    return !this.cookieService.checkCookie('jwt');
  }
}
