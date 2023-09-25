import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { createRecord } from 'src/app/models/records.model';
import { RecordsService } from 'src/app/services/records/records.service';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent {
  submitted:boolean = false;
  isWorking:boolean = false;

  constructor(
    private recordsService: RecordsService,
    private router: Router,
    private toast: HotToastService
  ) {}

  createForm = new FormGroup(
    {
      caseId: new FormControl(null, Validators.required),
      dateOpened: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      dateClosed: new FormControl(null, []),
      description: new FormControl(null, Validators.required),
    }
  );

  get f() {
    return this.createForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.createForm.invalid) {
      return;
    }

    this.isWorking = true;
    this.createForm.disable();

    const createData = new createRecord(
      this.createForm.value.caseId!, 
      this.createForm.value.title!,
      this.createForm.value.description!,
      this.createForm.value.dateOpened!,
      this.createForm.value.dateClosed!
    )

    this.recordsService.createRecord(createData).subscribe({
			next: (v) => {
        this.toast.success("Record added successfully");
        this.router.navigate(['/app']);

			},
			error: (e) => {
				let message = e.error.message;
        this.isWorking = false;
        this.createForm.enable();
				
        if (message) {
          this.toast.error(message);
        } else {
          this.toast.error("An unknown error occurred. Please try again")
        }
			},
		});
  }
}
