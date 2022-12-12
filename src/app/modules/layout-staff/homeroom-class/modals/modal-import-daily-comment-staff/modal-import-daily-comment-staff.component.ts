import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {Router} from "@angular/router";
import {translate} from "@ngneat/transloco";
import {EmployeeStaffService} from "../../../../../_services/layout-staff/employee/employee-staff.service";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-modal-import-daily-comment-staff',
  templateUrl: './modal-import-daily-comment-staff.component.html',
  styleUrls: ['./modal-import-daily-comment-staff.component.scss']
})
export class ModalImportDailyCommentStaffComponent implements OnInit {
  @Input() dataModal: any;
  isLoading: boolean = false;
  fileName: string = '';
  file: any = null;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private router: Router,
    private employeeStaffService: EmployeeStaffService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  confirmUploadFile() {
    this.isLoading = true;
    let formData: FormData = new FormData();
    formData.append('upload', this.file);
    this.employeeStaffService.uploadFileImportEmployee(formData).subscribe((res: any) => {
      this.isLoading = false;
      console.log("res",res);
      // this.activeModal.close(res.data);
      // this.router.navigate([`staff/employee/result-import-file`, res.data.keyImport], {queryParams: {nameFile: this.fileName}});
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    })
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.slice(-5) == '.xlsx' || event.target.files[0].name.slice(-4) == '.xls') {
        this.fileName = event.target.files[0].name;
        this.file = file;
      } else {
        this.showMessageService.warning(translate('errorFileExcel'))
      }
    }
  }

  uploadFile() {
    document.getElementById('input-file-daily-comment').click();
  }
}
