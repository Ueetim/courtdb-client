import { Component } from '@angular/core';
import { User } from 'src/app/auth/auth.model';
import { Record } from 'src/app/models/records.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user!:User;
  records!:Record[];
  openRecords:Record[] = [];
  closedRecords:Record[] = [];

  constructor() {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user")!);

    if (localStorage.getItem("records")) {
      this.records = JSON.parse(localStorage.getItem("records")!);
      console.log(this.records)

      this.records.forEach((record)=>{
        if (record.status == "Open") {
          this.openRecords!.push(record);
        } else {
          this.closedRecords!.push(record);
        }
      })
    }
  }
}
