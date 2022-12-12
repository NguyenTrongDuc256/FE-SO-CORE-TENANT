import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/_services/general.service';
import { StudentStaffService } from 'src/app/_services/layout-staff/student/student-staff.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';

@Component({
  selector: 'app-modal-import-student-staff',
  templateUrl: './modal-import-student-staff.component.html',
  styleUrls: ['./modal-import-student-staff.component.scss']
})
export class ModalImportStudentStaffComponent implements OnInit {
  @Input() dataModal: any;
  isLoading: boolean = false;
  schoolId: string = '';
  fileName: string = '';
  file: any = null;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private studentStaffService: StudentStaffService,
    private router: Router,
    private generalService: GeneralService


  ) { }

  ngOnInit(): void {
    this.schoolId = JSON.parse(localStorage.getItem('currentUnit')).id;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  confirmUploadFile() {
    this.isLoading = true;
    let formData: FormData = new FormData();
    formData.append('upload', this.file);
    formData.append('SchoolId', this.schoolId);
    this.studentStaffService.uploadFileImportStudent(formData).subscribe((ref: any) => {
      this.isLoading = false;
      this.activeModal.close(ref.data);
      this.router.navigate([`/staff/student/result-import-file/${ref.data.keyImport}`], { queryParams: { nameFile: this.fileName } });
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    })
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.slice(-5) == '.xlsx' || event.target.files[0].name.slice(-4) == '.xls') {
        this.fileName = event.target.files[0].name;
        this.file = file;
      } else {
        this.showMessageService.warning('Không đúng định dạng file')
      }
    }
  }

  uploadFile() {
    document.getElementById('input-file-upload-hoc-sinh').click();
  }

}
