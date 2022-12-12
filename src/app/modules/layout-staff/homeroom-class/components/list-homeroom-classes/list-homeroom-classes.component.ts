import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { HomeroomClass } from 'src/app/_models/layout-staff/training/homeroom-class.model';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { AVATAR_DEFAULT, DATA_PERMISSION, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import {
  ModalImportFileHomeroomClassStaffComponent
} from "../../modals/modal-import-file-homeroom-class-staff/modal-import-file-homeroom-class-staff.component";

@Component({
  selector: 'app-list-homeroom-classes-layout-staff',
  templateUrl: './list-homeroom-classes.component.html',
  styleUrls: ['./list-homeroom-classes.component.scss', '../../helper.scss']
})
export class ListHomeroomClassesComponent implements OnInit {

  keyword = '';
  arrList: Array<HomeroomClass> = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrGrades = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades : [];
  gradeId = '';
  arrStatus = [
    { value: 1, label: 'activated', isChecked: false },
    { value: 0, label: 'locked', isChecked: false },
  ];
  arrHomeroomClassType = [
    { value: 0, label: 'training.typeGroupHomeroomClass0', isChecked: false },
    { value: 1, label: 'training.typeGroupHomeroomClass1', isChecked: false }
  ];
  arrAttendancesStatus = [
    { value: 1, label: 'attended', isChecked: false },
    { value: 0, label: 'noAttendance', isChecked: false },
  ]
  avatarDefault = AVATAR_DEFAULT;
  isLoadedDataGrade = false;
  currentUnit = localStorage.getItem('currentUnit') ? JSON.parse(localStorage.getItem('currentUnit')) : {};
  isEnableClassAvatar: number;
  educationalStage = localStorage.getItem('currentUnit') ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages : null;

  constructor(
    private modalService: NgbModal,
    private trainingService: TrainingService,
    private router: Router,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('tenantProfile')) {
      this.isEnableClassAvatar = JSON.parse(localStorage.getItem('tenantProfile'))['isEnableClassAvatar']
    }
    this.arrGrades = this.arrGrades.filter(item => item.isActive == 1 && item.educationalStages == this.educationalStage);
    this.getList();
  }

  getList() {
    let isActiveStatus: string | number = '';
    let attendancesStatus: string | number = '';
    let typeClass: string | number = '';
    if (this.arrStatus.every(item => item.isChecked == true)
      || this.arrStatus.every(item => item.isChecked == false)) isActiveStatus = '';
    else isActiveStatus = this.arrStatus.find(item => item.isChecked)?.value;

    if (this.arrAttendancesStatus.every(item => item.isChecked == true)
      || this.arrAttendancesStatus.every(item => item.isChecked == false)) attendancesStatus = '';
    else attendancesStatus = this.arrAttendancesStatus.find(item => item.isChecked)?.value;

    if (this.arrHomeroomClassType.every(item => item.isChecked == true)
      || this.arrHomeroomClassType.every(item => item.isChecked == false)) typeClass = '';
    else typeClass = this.arrHomeroomClassType.find(item => item.isChecked)?.value;
    this.isLoading = true;
    this.trainingService
      .getListHomeroomClasses(typeClass, this.keyword, attendancesStatus, this.gradeId, isActiveStatus, this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          this.arrList = res.data.data;
          this.collectionSize = res.data?.totalItems;
          this.arrList.forEach(item => {
            item['GradeName'] = this.arrGrades.find(grade => grade.id == item.GradeId)?.name || '--';
          })
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  create() {
    this.router.navigate([`staff/homeroom-class/create`]);
  }

  delete(id: string, name: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'training.titleDialogDeleteHomeroomClass',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        role: id,
        dataInput: { id: id },
        service: this.trainingService,
        apiSubmit: (dataInput: any) => this.trainingService.deleteHomeroomClass(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'homeroom_class',
        textConfirmHeader:
          translate('training.textConfirmDeleteHomeroomClass1') +
          ' ' +
          name +
          ' ' +
          translate('training.textConfirmDeleteHomeroomClass2'),
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = PAGE_INDEX_DEFAULT;
          this.getList();
        }
      },
      (reason) => { }
    );
  }

  update(id: string) {
    this.router.navigate([`staff/homeroom-class/update/${id}`]);
  }

  search(event, value: string) {
    // if (event.key === 'Enter' || event.key === 'Tab') {
    //   this.searchByValue(value);
    // }
    if (event.key === 'Enter') {
      this.searchByValue(value);
    }
  }

  searchClickIcon(value: string) {
    this.searchByValue(value);
  }

  searchByValue(value: string) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.keyword = value.trim();
    this.getList();
  }

  filter() {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getList();
  }

  unFilter() {
    this.gradeId = '';
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.arrStatus = this.arrStatus.map((object) => {
      return { ...object, isChecked: false };
    });
    this.arrHomeroomClassType = this.arrHomeroomClassType.map((object) => {
      return { ...object, isChecked: false };
    });
    this.arrAttendancesStatus = this.arrAttendancesStatus.map((object) => {
      return { ...object, isChecked: false };
    });
    this.getList();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }
  import() {
    const modalRef = this.modalService.open(ModalImportFileHomeroomClassStaffComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: true,
        size: 'xl'
      });
  }
}
