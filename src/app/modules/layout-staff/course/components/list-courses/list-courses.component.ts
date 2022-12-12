import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Course } from 'src/app/_models/layout-staff/training/course.model';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT, STATUS_COURSE
} from 'src/app/_shared/utils/constant';
import { FormCourseLStaffComponent } from '../../modals/form-course/form-course-staff.component';

@Component({
  selector: 'app-list-courses-layout-staff',
  templateUrl: './list-courses.component.html',
  styleUrls: ['./list-courses.component.scss', '../../helper.scss'],
})
export class ListCoursesStaffComponent implements OnInit {

  keyword = '';
  arrList: Course[] = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  arrGrades = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades : [];
  gradeId = '';
  arrStatus = STATUS_COURSE;
  status = '';
  arrHomeroomClass = [];
  typeClass = '';
  avatarDefault = AVATAR_DEFAULT;
  isLoadedDataGrade = false;
  currentUnit = localStorage.getItem('currentUnit')
    ? JSON.parse(localStorage.getItem('currentUnit'))
    : {};
  isEnableClassAvatar: number;
  homeroomClassId = '';
  subjectId = '';
  arrSubject = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).subjects : [];
  educationalStage = localStorage.getItem('currentUnit') ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages : null;

  constructor(
    private modalService: NgbModal,
    private trainingService: TrainingService,
    private router: Router,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('tenantProfile')) {
      this.isEnableClassAvatar = JSON.parse(
        localStorage.getItem('tenantProfile')
      )['isEnableClassAvatar'];
    }
    this.arrGrades = this.arrGrades.filter(item => item.isActive == 1 && item.educationalStages == this.educationalStage);
    this.arrSubject = this.arrSubject.filter(item => item.isActive == 1 && item.educationalStages.includes(this.educationalStage));
    this.getListHomeroomClasses();
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.trainingService
      .getListCourses(
        this.keyword,
        this.gradeId,
        this.subjectId,
        this.homeroomClassId,
        this.status,
        this.pageIndex,
        this.pageSize
      )
      .subscribe(
        (res: any) => {
          this.arrList = res.data?.data;
          this.collectionSize = res.data?.totalItems;
          this.arrList.forEach(i => {
            i['subjectName'] = this.mapName(i.subjectId, this.arrSubject);
            i['gradeName'] = this.mapName(i.gradeId, this.arrGrades);
            i['statusName'] = this.mapStatus(i.status, this.arrStatus);
          })
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  getListHomeroomClasses() {
    this.isLoading = true;
    this.trainingService
      .getListHomeroomClasses('', '', '', '', 1, PAGE_INDEX_DEFAULT, 99999)
      .subscribe(
        (res: any) => {
          this.arrHomeroomClass = res.data.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  mapName(id: string | number, arrToFind: any[]): string {
    return arrToFind.find(i => i.id == id)?.name || '--';
  }

  mapStatus(id: string | number, arrToFind: any[]): string {
    return arrToFind.find(i => i.value == id)?.label || '--';
  }

  formCourse(nameForm: string, valueForm) {
    let modalRef: NgbModalRef;
    let titleForm = nameForm == 'create' ? 'training.addCourse': 'training.updateCourse';
    let dataFromParent = {
      arrHomeroomClasses: [],
      nameForm: nameForm,
      course: valueForm,
      isEnableClassAvatar: this.isEnableClassAvatar
    };
    this.isLoading = true;
    this.trainingService
      .getListHomeroomClasses('', '', '', '', 1, PAGE_INDEX_DEFAULT, 99999)
      .subscribe(
        (res: any) => {
          dataFromParent.arrHomeroomClasses = res.data.data;
          modalRef = this.openModal(
            FormCourseLStaffComponent,
            titleForm,
            'btnAction.cancel',
            'btnAction.save',
            dataFromParent,
            'xl',
            'static'
          );
          this.isLoading = false;
          modalRef.result.then(
            (result: boolean) => {
              if (result) {
                this.pageIndex = PAGE_INDEX_DEFAULT;
                this.getList();
              }
            },
            (reason) => {}
          );
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  delete(id: string, name: string) {
    let dataFromParent = {
      id: id,
        dataInput: { id: id },
        service: this.trainingService,
        apiSubmit: (dataInput: any) =>
          this.trainingService.deleteCourse(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'course',
        textConfirmHeader:
          translate('training.textConfirmDeleteCourse1') +
          ' ' +
          name +
          ' ' +
          translate('training.textConfirmDeleteCourse2'),
    };
    const modalRef: NgbModalRef = this.openModal(
      ModalDeleteComponent,
      'training.titleDialogDeleteCourse',
      'btnAction.cancel',
      'btnAction.delete',
      dataFromParent,
      'modal-md-plus'
    );
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = PAGE_INDEX_DEFAULT;
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  update(id: string) {
    this.router.navigate([`staff/homeroom-class/update/${id}`]);
  }

  openModal(
    compo: any,
    titleModal: string,
    btnCancel: string,
    btnAccept: string,
    dataFromParent: any,
    size: string = 'xl',
    backdrop: boolean | 'static' = true
  ) {
    const modalRef = this.modalService.open(compo, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: backdrop, // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: size, // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: titleModal,
      btnCancel: btnCancel,
      btnAccept: btnAccept,
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: dataFromParent,
    };

    modalRef.componentInstance.dataModal = data;
    return modalRef;
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

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }
}
