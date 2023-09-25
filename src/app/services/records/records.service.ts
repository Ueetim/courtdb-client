import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel, SignupModel, User } from 'src/app/auth/auth.model';
import { map } from 'rxjs/operators';
import { CookieServices } from '../cookie.service';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  baseUrl: string = "http://localhost:4000/api";

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieServices
  ) { }

  public getUserRecords() {
    return this.httpClient.get<any>(this.baseUrl + '/records', { withCredentials: true })
      .pipe(map(res => {
        return res;
      }));
  }
}
