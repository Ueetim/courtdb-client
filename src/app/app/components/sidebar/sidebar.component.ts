import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieServices } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  lastUrlSegment = this.router.url.split('?')[0].split('/').pop();
  showSidebar: boolean = false;
  sidebarClick: boolean = false;

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private cookieService: CookieServices,
    private router: Router
  ){}

  toggleSidebar() {
    this.showSidebar = !this.showSidebar
  }

  preventCloseOnClick() {
    this.sidebarClick = true;
  }

  logout() {
    this.authService.logout().subscribe({
			next: (v) => {
        this.cookieService.deleteCookie('jwt', '/');
        this.router.navigate(["/auth/login"]);
        this.toast.info("User logged out");
			},
			error: (e) => {
        this.toast.error("Oops! Something went wrong")
				console.log(e);
			},
		});
    this.authService.logout();
    
    
  }
}
