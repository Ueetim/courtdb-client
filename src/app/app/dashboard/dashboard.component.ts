import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieServices } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(
    private cookieService: CookieServices,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.authService.getUser().subscribe({
			next: (v) => {
        console.log(v)

			},
			error: (e) => {
				console.log(e)
			},
		});
  }  
}
