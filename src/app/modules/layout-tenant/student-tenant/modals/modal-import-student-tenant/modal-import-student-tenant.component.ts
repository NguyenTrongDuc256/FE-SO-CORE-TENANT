import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { StudentService } from 'src/app/_services/layout-tenant/student/student.service';
import { GeneralService } from 'src/app/_services/general.service';
@Component({
  selector: 'app-modal-import-student-tenant',
  templateUrl: './modal-import-student-tenant.component.html',
  styleUrls: ['./modal-import-student-tenant.component.scss']
})
export class ModalImportStudentTenantComponent implements OnInit {
  @Input() dataModal: any;
  isLoading: boolean = false;
  schoolId: string = '';
  fileName: string = '';
  file: any = null;
  nzNotFoundContent: string = 'student.notFoundContent';
  txtSelect: string = 'student.select';

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private studentService: StudentService,
    private router: Router,
    private generalService: GeneralService,

  ) { }

  ngOnInit(): void {
    this.schoolId = this.dataModal?.dataSchools["0"]?.id;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  confirmUploadFile() {
    this.isLoading = true;
    let formData: FormData = new FormData();
    formData.append('upload', this.file);
    formData.append('SchoolId', this.schoolId);


    this.studentService.uploadFileImportStudent(formData).subscribe((ref: any) => {
      this.isLoading = false;
      this.activeModal.close(ref.data);
      this.router.navigate([`/tenant/student/result-import-file/${ref.data.keyImport}`], { queryParams: { nameFile: this.fileName } });
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
