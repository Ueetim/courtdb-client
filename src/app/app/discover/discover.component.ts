import { Component } from '@angular/core';
import { Record } from 'src/app/models/records.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CookieServices } from 'src/app/services/cookie.service';
import { RecordsService } from 'src/app/services/records/records.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {
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
    // get user records
    this.recordsService.getPublicRecords().subscribe({
			next: (v) => {
        this.allRecords = v.reverse();
        this.records = this.allRecords;
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
