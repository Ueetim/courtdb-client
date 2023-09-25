import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieServices } from 'src/app/services/cookie.service';
import { RecordsService } from 'src/app/services/records/records.service';
import { Record } from 'src/app/models/records.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  skeletonPreloader = [1, 2, 3, 4];
  records?: Record[];
  emptyRecord: boolean = false;

  constructor(
    private cookieService: CookieServices,
    private authService: AuthService,
    private recordsService: RecordsService
  ){}

  ngOnInit() {
    // get user data
    this.authService.getUser().subscribe({
			next: (v) => {
        let user = JSON.stringify(v);
        localStorage.setItem("user", user);

			},
			error: (e) => {
				console.log(e)
			},
		});

    // get user records
    this.recordsService.getUserRecords().subscribe({
			next: (v) => {
        this.records = v.reverse();
			},
			error: (e) => {
        if (e.error.message == "nothing found") {
          this.emptyRecord = true;
        } else {
          console.log(e)
        }
			},
		});
  }  
}
