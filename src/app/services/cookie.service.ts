import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServices {

  constructor(private cookieService: CookieService,) { }

  // cookies
  getCookie(key: string){
    return this.cookieService.get(key);
  }

  checkCookie(key: string):boolean {
    return this.cookieService.check(key);
  }

  deleteCookie(key: string, path?: string){
    return this.cookieService.delete(key, path);
  }

  storeCookie(key: string, value: string, path?: string) {
		this.cookieService.set(key, value, {expires: 1, secure: true, path: path});
	}
}
