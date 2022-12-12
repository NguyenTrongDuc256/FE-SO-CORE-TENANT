import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {Router} from "@angular/router";
import {translate} from "@ngneat/transloco";
import {GeneralService} from "../../../../../_services/general.service";
import {ParentService} from "../../../../../_services/layout-tenant/parent/parent.service";

@Component({
  selector: 'app-modal-import-parent-tenant',
  templateUrl: './modal-import-parent-tenant.component.html',
  styleUrls: ['./modal-import-parent-tenant.component.scss']
})
export class ModalImportParentTenantComponent implements OnInit {
  @Input() dataModal: any;
  isLoading: boolean = false;
  fileName: string ='';
  file: any = null;
  nzNotFoundContent: string = 'employee.notFoundContent';
  schoolId: string = '';

  constructor(
    private activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private router: Router,
    private parentService: ParentService,
    private generalService: GeneralService,
  ) { }

  ngOnInit(): void {
    if (this.dataModal.schoolList.length > 0) {
      this.schoolId = this.dataModal.schoolList[0].id;
    }
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  confirmUploadFile() {
    this.isLoading = true;
    let formData:FormData = new FormData();
    formData.append('upload', this.file);
    formData.append('schoolId', this.schoolId);
    this.parentService.uploadFileImportParent(formData).subscribe(
      (res: any) => {
      this.isLoading = false;
      this.activeModal.close({
        keyImport: res.data.keyImport,
        schoolId: this.schoolId,
      });
      this.router.navigate([`tenant/parent/result-import-file`, res.data.keyImport, this.schoolId], {queryParams: {nameFile: this.fileName}});
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
        this.showMessageService.warning(translate('errorFileExcel'))
      }
    }
  }

  uploadFile() {
    document.getElementById('input-file-upload-parent').click();
  }
}
