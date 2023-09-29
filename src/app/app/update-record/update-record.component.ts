import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { updateRecord } from 'src/app/models/records.model';
import { RecordsService } from 'src/app/services/records/records.service';
import { Record } from 'src/app/models/records.model';

@Component({
  selector: 'app-update-record',
  templateUrl: './update-record.component.html',
  styleUrls: ['./update-record.component.css']
})
export class UpdateRecordComponent implements OnInit {
  submitted:boolean = false;
  isWorking:boolean = false;
  record!:Record;
  date:Date = new Date();

  constructor(
    private recordsService: RecordsService,
    private router: Router,
    private toast: HotToastService
  ) {}

  updateForm = new FormGroup(
    {
      caseId: new FormControl('', Validators.required),
      dateOpened: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      dateClosed: new FormControl('', []),
      description: new FormControl('', Validators.required),
    }
  );

  get f() {
    return this.updateForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.updateForm.invalid) {
      return;
    }

    this.isWorking = true;
    this.updateForm.disable();

    const data = new updateRecord(
      this.record.ID!.toString(),
      this.updateForm.value.caseId!, 
      this.updateForm.value.title!,
      this.updateForm.value.description!,
      this.updateForm.value.dateOpened!,
      this.updateForm.value.dateClosed!
    )

    this.recordsService.updateRecord(data).subscribe({
			next: (v) => {
        this.toast.success("Record updated successfully");
        localStorage.setItem("record", JSON.stringify(v));
        this.router.navigate(['/app/record/'+ this.record.ID]);

			},
			error: (e) => {
				let message = e.error.message;
        this.isWorking = false;
        this.updateForm.enable();
				
        if (message) {
          this.toast.error(message);
        } else {
          this.toast.error("An unknown error occurred. Please try again")
        }
			},
		});
  }

  ngOnInit(): void {
    let records = JSON.parse(localStorage.getItem("records")!);
    let lastUrlSegment = this.router.url.split('?')[0].split('/').pop();

    records.forEach((record:Record) => {
      if (record.ID!.toString() == lastUrlSegment) {
        this.record = record;
      }
    })

    this.updateForm.controls['caseId'].setValue(this.record.record_id);
    this.updateForm.controls['title'].setValue(this.record.title);
    this.updateForm.controls['dateOpened'].setValue(this.record.created);
    this.updateForm.controls['dateClosed'].setValue(this.record.completed);
    this.updateForm.controls['description'].setValue(this.record.description);
  }
}
