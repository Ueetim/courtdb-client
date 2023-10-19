import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieServices } from './services/cookie.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static token:string;

  constructor(private cookieService: CookieServices) {
    const itemSet = this.cookieService.checkCookie("auth");
    if (itemSet) {
      AuthInterceptor.token = this.cookieService.getCookie('auth')!;
    } else {
      AuthInterceptor.token = "";
    }
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
      const req = request.clone({
        setHeaders: {
          token: AuthInterceptor.token
        }
      })
    return next.handle(req);
  }
}
