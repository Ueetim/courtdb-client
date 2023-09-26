import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieServices } from 'src/app/services/cookie.service';
import { RecordsService } from 'src/app/services/records/records.service';
import { Record } from 'src/app/models/records.model';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  skeletonPreloader = [1, 2, 3, 4];
  allRecords?: Record[];
  records?: Record[];
  emptyRecord: boolean = false;
  p:number = 1;

  options = [
    { id: 'all', name: 'All' },
    { id: 'Open', name: 'Open' },
    { id: 'Closed', name: 'Closed' },
  ];

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
        this.allRecords = v.reverse();
        this.records = this.allRecords;
        
        let userRecords = JSON.stringify(this.allRecords);
        localStorage.setItem("records", userRecords);
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
  
  sortCases(status: any) {
    this.records = [];

    if (this.allRecords) {
      this.allRecords.forEach((record)=>{
        if (status == "all") {
          this.records = this.allRecords;
        } else {
          if (record.status == status) {
            this.records!.push(record);
          }
        }
      })
    }
  }
}
