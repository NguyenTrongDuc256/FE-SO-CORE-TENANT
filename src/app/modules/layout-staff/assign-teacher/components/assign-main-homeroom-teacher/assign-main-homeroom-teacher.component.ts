import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeroomClass } from 'src/app/_models/layout-staff/training/homeroom-class.model';
import { User } from 'src/app/_models/user.model';
import { GeneralService } from 'src/app/_services/general.service';
import { AssignTeacherService } from 'src/app/_services/layout-staff/assign-teacher/assign-teacher.service';
import { ModalConfirmAssignMainHomeroomTeacherComponent } from '../../modals/modal-confirm-assign-main-homeroom-teacher/modal-confirm-assign-main-homeroom-teacher.component';

@Component({
  selector: 'app-assign-main-homeroom-teacher',
  templateUrl: './assign-main-homeroom-teacher.component.html',
  styleUrls: ['./assign-main-homeroom-teacher.component.scss'],
})
export class AssignMainHomeroomTeacherComponent implements OnInit {
  isLoading = false;
  arrClasses: Array<Class> = [];
  arrGrades = localStorage.getItem('dataConfigSystem')
    ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades
    : [];
  educationalStage = localStorage.getItem('currentUnit')
    ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages
    : null;
  gradeId = '';
  keyword = '';
  isAssigned = assignmentStatus.ALL_STATUS;
  arrUsers: Array<Teacher> = [];
  assignmentStatus = assignmentStatus;
  teacherIdsSelected = [];

  constructor(
    private assignTeacherService: AssignTeacherService,
    private modalService: NgbModal,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.arrGrades = this.arrGrades.filter(
      (item) =>
        item.isActive == 1 && item.educationalStages == this.educationalStage
    );
    this.getListClasses();
    this.getListUsers();
  }

  getListUsers() {
    this.isLoading = true;
    this.assignTeacherService
      .getListMainHomeroomTeachers(this.keyword)
      .subscribe(
        (res: any) => {
          this.arrUsers = res.data;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  getListClasses() {
    this.isLoading = true;
    this.assignTeacherService
      .getListHomeroomClassesToAssignMainTeacher(
        this.gradeId,
        this.isAssigned,
        this.keyword
      )
      .subscribe(
        (res: any) => {
          this.arrClasses = res.data;
          this.arrClasses = this.arrClasses.map(item => {
            return {...item, oldTeacherId: item.homeroomTeacherId}
          })
          this.arrClasses.forEach((element) => {
            element['gradeName'] =
              this.arrGrades.find((gr) => gr.id == element.gradeId)?.name ||
              '--';
          });
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
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
    this.keyword = value.trim();
    this.getListClasses();
  }

  filter() {
    this.getListClasses();
  }

  chooseUser(userIdSelected, valueClass, indexClass: number) {
    let indexUserSelected = this.arrUsers.findIndex(item => item.id == userIdSelected);
    if(indexUserSelected != -1) {
      this.openModalConfirm(this.arrUsers[indexUserSelected], valueClass, indexClass);
    }
  }

  openModalConfirm(userInfo, classInfo: any, indexClass: number) {
    let oldUser = this.arrUsers.find(item => item.id == classInfo.oldTeacherId)?.name;
    let data = {
      titleModal: 'assignTeacher.titleModalConfirmMainHomeroomTeacher',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        userInfo: userInfo,
        classInfo: classInfo,
        oldUser: oldUser,
        dataInput: { teacherId: userInfo?.id, classId: classInfo?.id, moveOut: 0 },
        service: this.assignTeacherService,
        apiSubmit: (dataInput: any) =>
          this.assignTeacherService.assignMainHomeroomTeacher(dataInput),
        keyFirebaseAction: 'main-homeroom-class-teacher',
        keyFirebaseModule: 'assignment',
      },
    };
    const modalRef = this.modalService.open(ModalConfirmAssignMainHomeroomTeacherComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'lg',
      size: 'xl',
      backdrop: 'static'
    });
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {

        } else {
          this.arrClasses[indexClass].homeroomTeacherId = this.arrClasses[indexClass].oldTeacherId;
        }
      },
      (reason) => {}
    );
  }
}

enum assignmentStatus {
  ALL_STATUS = 0,
  ASSIGNED = 1,
  UNASSIGNED = 2,
}

export interface Teacher extends User {
  id: string;
}

export interface Class extends HomeroomClass {
  id: string;
  gradeId: string;
  homeroomTeacherId: string;
  name: string;
  code: string;
  oldTeacherId?: string
  gradeName?: string
}
