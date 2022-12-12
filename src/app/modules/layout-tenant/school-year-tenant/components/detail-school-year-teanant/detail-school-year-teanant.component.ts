import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { SchoolYearService } from 'src/app/_services/layout-tenant/school-year/school-year.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { ModalFormEditSchoolYearComponent } from '../../modals/modal-form-edit-school-year/modal-form-edit-school-year.component';

@Component({
  selector: 'app-detail-school-year-teanant',
  templateUrl: './detail-school-year-teanant.component.html',
  styleUrls: ['./detail-school-year-teanant.component.scss']
})
export class DetailSchoolYearTenantComponent implements OnInit {
  tabActive: number = 1;
  schoolYearId:string = '';
  isLoading: boolean = false;
  dataDetailSchoolYear:any;
  checkIsCurrentYear:boolean;
  tenantId:string = localStorage.getItem("Tenant") ? JSON.parse(localStorage.getItem("Tenant")).Id : '';
  constructor(
    private activatedRoute:ActivatedRoute,
    private schoolYearService: SchoolYearService,
    private modalService: NgbModal,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {
    this.schoolYearId = this.activatedRoute.snapshot.params.id;
    if(this.schoolYearId){
      this.getDetailSchoolYear();
    }
  }

  getDetailSchoolYear(){
    this.isLoading = true;
    this.schoolYearService.getDataEdit(this.tenantId,this.schoolYearId).subscribe((res: any) => {
      this.dataDetailSchoolYear = res;
      this.isLoading = false;
    })
  }

  changeActiveTab(value: number) {
    this.tabActive = value;
  }

  getNameStatusSchoolYear(value:number){
    return value == 2 ? translate('schoolYear.upcoming') : value == 1 ? translate('schoolYear.current') : translate('schoolYear.finished');
  }

  getNameStatusReportOfTerm(value:number){
    return value == 1 ? 'schoolYear.showReport' : 'schoolYear.turnOffShowReports';
  }

  getNameStatusCirculars(value:number){
    return value == 1 ? 'schoolYear.unexpired' : 'schoolYear.expired';
  }

  getDataRelationship() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.schoolYearService.getDataRelationship(this.tenantId).subscribe((res: any) => {
      this.openModalUpdate(this.dataDetailSchoolYear, res);
      this.isLoading = false;
      clearTimeout(timeoutCallAPI);
    }, (_err: any) => {
      this.isLoading = false;
      clearTimeout(timeoutCallAPI);
    });
  }

  openModalUpdate(item: any, dataRelationship: any) {
    const modalRef = this.modalService.open(ModalFormEditSchoolYearComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        backdrop: 'static',
        size: 'xxl'
      });

    let data = {
      titleModal: translate('schoolYear.updateSchoolYear'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false,
      dataFromParent: item,
      dataRelationship: dataRelationship,
      tenantId: this.tenantId
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDetailSchoolYear();
      }
    }, (reason) => {});
  }

}
