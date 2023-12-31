import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RecordsService } from 'src/app/services/records/records.service';
import { Record, documentation, visibility } from 'src/app/models/records.model';
import { HotToastService } from '@ngneat/hot-toast';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FileService } from 'src/app/services/files/file.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.component.html',
  styleUrls: ['./record-detail.component.css']
})
export class RecordDetailComponent {
  record!: Record;
  userId!: number;
  isWorking: boolean = false;
  deletePopup:boolean = false;
  isDeleting: boolean = false;
  documentation: boolean = false;
  documentationDropdown:boolean = false;
  uploadDialog:boolean = false;
  editorContent!: string;
  disabled: boolean = false;
  isUploading:boolean = false;
  filename:string = "";
  caseFiles!:any;
  baseUrl = this.fileService.baseUrl;
  @Input() control!: FormControl

  uploadForm!: FormGroup;

  constructor(
    private router: Router,
    private recordsService: RecordsService,
    private fileService: FileService,
    private toast: HotToastService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.control = this.control ?? new FormControl()

    let user = JSON.parse(localStorage.getItem("user")!);
    this.userId = user.ID;

    this.getRecord();

    this.uploadForm = this.formBuilder.group({
      file: '',
    });

    this.getCaseFiles();
  }

  getRecord() {
    if (localStorage.getItem('record')) {
      this.record = JSON.parse(localStorage.getItem("record")!);
      localStorage.removeItem("record");
    } else {
      let lastUrlSegment = this.router.url.split('?')[0].split('/').pop();

      let path = this.router.url.split('/');
      let param = path[path.length - 2];

      let records;

      if (param == "public") {
        this.disabled = true;
        records = JSON.parse(localStorage.getItem("publicRecords")!);
      } else {
        records = JSON.parse(localStorage.getItem("records")!);
      }

      records.forEach((record: Record) => {
        if (record.ID!.toString() == lastUrlSegment) {
          this.record = record;
        }
      })
    }

    this.editorContent = this.record.documentation;
  }

  changeVisibility(value: string) {
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

  deleteRecord() {
    this.isDeleting = true;

    const data = this.record.ID;

    this.recordsService.deleteRecord(data).subscribe({
      next: (v) => {
        this.record = v;
        this.isDeleting = false;
        this.toast.success("Record deleted");
        this.router.navigate(["/app"]);
      },
      error: (e) => {
        this.isDeleting = false;

        this.toast.error("Failed to delete record")
      },
    });
  }

  onFileSelect(item:any) {
    if (item.files.length > 0) {
      const file = item.files[0];
      this.uploadForm.get('file')!.setValue(file);
      this.filename = file.name;
    }
  }

  getCaseFiles() {
    this.fileService.getCaseFiles(this.record.ID).subscribe({
      next: (v) => {
        if (v.length > 0) {
          this.caseFiles = v;
        }
      },
      error: (e) => {
        let message = e.error.message;
        this.isUploading = false;

        if (message) {
          this.toast.error(message);
        } else {
          this.toast.error("Couldn't fetch case files. Please try again")
        }
      },
    });
  }

  onSubmit() {
    this.isUploading = true;
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('file')!.value);
    formData.append('case_id', this.record.ID.toString());

    this.fileService.uploadFile(formData).subscribe({
      next: (v) => {
        // console.log(v);
        this.isUploading = false;
        this.uploadDialog = false;
        this.toast.success("File uploaded successfully");
        this.getCaseFiles();
      },
      error: (e) => {
        let message = e.error.message;
        this.isUploading = false;

        if (message) {
          this.toast.error(message);
        } else {
          this.toast.error("An unknown error occurred. Please try again")
        }
      },
    });
  }
}
