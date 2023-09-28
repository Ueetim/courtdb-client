import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from 'src/app/services/records/records.service';
import { Record, documentation, visibility } from 'src/app/models/records.model';
import { HotToastService } from '@ngneat/hot-toast';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent {
  record!: Record;
  userId!: number;
  isWorking:boolean = false;
  documentation:boolean = false;
  editorContent!:string;
  disabled:boolean = false;
  @Input() control!: FormControl

  constructor(
    private router: Router,
    private recordsService: RecordsService,
    private toast: HotToastService
  ){}

  ngOnInit() {
    this.control = this.control ?? new FormControl()
    
    let user = JSON.parse(localStorage.getItem("user")!);
    this.userId = user.ID;
    
    this.getRecord();
    
  }

  getRecord() {
    let lastUrlSegment = this.router.url.split('?')[0].split('/').pop();

    let path= this.router.url.split('/');
    let param = path[path.length-2];

    let records;
    
    if (param == "public") {
      this.disabled = true;
      records = JSON.parse(localStorage.getItem("publicRecords")!);
    } else {
      records = JSON.parse(localStorage.getItem("records")!);
    }

    records.forEach((record:Record) => {
      if (record.ID!.toString() == lastUrlSegment) {
        this.record = record;
      }
    })

    this.editorContent = this.record.documentation;
  }

  changeVisibility(value:string) {
    this.isWorking = true;

    const data = new visibility(
      this.record.ID.toString(),
      value
    )

    this.recordsService.changeVisibility(data).subscribe({
			next: (v) => {
        this.record = v;
        this.isWorking = false;
        this.toast.success("Visibility updated");
			},
			error: (e) => {
				let message = e.error.message;
        this.isWorking = false;
				
        if (message) {
          this.toast.error(message);
        } else {
          this.toast.error("An unknown error occurred. Please try again")
        }
			},
		});
  }

  showDocumentation() {
    this.documentation = true;
  }

  hideDocumentation() {
    this.documentation = false;
  }

  updateDocumentation() {
    this.isWorking = true;

    const data = new documentation(
      this.record.ID.toString(),
      this.control.value
    )

    this.recordsService.updateDocumentation(data).subscribe({
			next: (v) => {
        this.record = v;
        this.isWorking = false;
        this.toast.success("Documentation updated");
        // this.getRecord();
			},
			error: (e) => {
				let message = e.error.message;
        this.isWorking = false;
				
        if (message) {
          this.toast.error(message);
        } else {
          this.toast.error("An unknown error occurred. Please try again")
        }
			},
		});
  } 
}
