import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel, SignupModel, User } from 'src/app/auth/auth.model';
import { map } from 'rxjs/operators';
import { CookieServices } from '../cookie.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieServices
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

  public getUser() {
    return this.httpClient.get<any>(this.baseUrl + '/user', { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public logout() {
    return this.httpClient.post<any>(this.baseUrl + '/logout', { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }

  public isLoggedIn() {
    return this.cookieService.checkCookie('jwt');
  }

  public isLoggedOut() {
    return !this.cookieService.checkCookie('jwt');
  }
}
