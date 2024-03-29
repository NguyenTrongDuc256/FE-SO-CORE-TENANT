import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { StudentList } from 'src/app/_models/layout-staff/student/student.model';
import { GeneralService } from 'src/app/_services/general.service';
import { StudentStaffService } from 'src/app/_services/layout-staff/student/student-staff.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalChangePasswordComponent } from 'src/app/_shared/modals/modal-change-password/modal-change-password.component';
import { ModalChangeUsernameCodeComponent } from 'src/app/_shared/modals/modal-change-username-code/modal-change-username-code.component';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { AVATAR_DEFAULT, DATA_PERMISSION, MESSAGE_ERROR_CALL_API, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT, STUDENT_STATUS, STUDENT_STATUS_SELECT, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { ModalImportStudentStaffComponent } from '../../modals/modal-import-student-staff/modal-import-student-staff.component';

@Component({
  selector: 'app-student-staff-list',
  templateUrl: './student-staff-list.component.html',
  styleUrls: ['./student-staff-list.component.scss']
})
export class StudentStaffListComponent implements OnInit {
  avatarUser: string = AVATAR_DEFAULT;
  permission = DATA_PERMISSION;
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = 1;
  pageSize: number = PAGE_SIZE_DEFAULT;
  keyWord: string = '';
  isLoading: boolean = false;
  statusValue: string = '';
  schoolValue: string = '';
  gradeValue: string = '';
  classValue: string = '';
  dataSchools: any;
  dataGrades: any;
  dataHomeroomClasses: any;
  studentDataRelate: any;
  studentStatus = STUDENT_STATUS_SELECT;
  dataSource: StudentList[];
  oldPageIndex = this.pageIndex;

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private studentStaffService: StudentStaffService,
    private generalService: GeneralService

  ) {
  }

  ngOnInit(): void {
    this.schoolValue = JSON.parse(localStorage.getItem('currentUnit')).id;

    this.getDataStudent();
    this.getStudentDataRelate();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataStudent();
  }

  onChangeGrade() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = 1;
    this.dataHomeroomClasses = this.studentDataRelate.homeroomClasses.filter(item => item.schoolId == this.schoolValue && item.gradeId == this.gradeValue)//get homeroomClasses
    this.classValue = '';
    this.getDataStudent();

  }

  onChangeClass() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = 1;
    this.getDataStudent();
  }

  onChangeStatus() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = 1;
    this.getDataStudent();
  }

  search(valueSearch): void {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = 1;
    this.keyWord = valueSearch;
    this.getDataStudent();
  }

  getStudentDataRelate() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.studentStaffService.getStudentDataRelate().subscribe((res: any) => {
      this.studentDataRelate = res.data;
      this.dataSchools = this.studentDataRelate.schools;
      let schoolSelected = this.studentDataRelate.schools.find(item => item.id == this.schoolValue);
      this.dataGrades = this.studentDataRelate.grades.filter(item => item.educationStages == schoolSelected?.educationStages);
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    });
  }

  getDataStudent() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.studentStaffService.getStudentList(this.pageSize, this.pageIndex, this.schoolValue, this.gradeValue, this.classValue, this.statusValue, this.keyWord).subscribe((res: any) => {
      this.collectionSize = res.data.totalItems;
      this.dataSource = res.data.data;
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);

    });
  }

  import() {
    const modalRef = this.modalService.open(ModalImportStudentStaffComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: true,
        size: 'xl'
      });

    let data: any = {
      title: 'titleImport',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataSchools: this.dataSchools
    }
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
    }, (reason) => {
    });

  }


  openModalComfirmDelete(item: any) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: 'student.deleteUser',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: { id: item.studentId },
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'student',
        apiSubmit: (dataInput: any) => {
          return this.studentStaffService.deleteStudent(dataInput)
        }
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataStudent();
      }
    }, (reason) => {

    });
  }

  openModalChangeUsernameCode(item: any): void {
    const modalRef = this.modalService.open(ModalChangeUsernameCodeComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        backdrop: 'static',
        size: 'lg',
      });
    let data: any = {
      titleModal: 'editUsernameCode',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        userId: item.studentUserId,
        fullName: item.fullName,
        code: item.code,
        username: item.username,
        keyFirebaseAction: 'update',
        keyFirebaseModule: 'user',
        apiSubmit: (dataInput: any) => {
          return this.generalService.changeUsernameCodeUserLayoutStaff(dataInput)
        }
      },
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataStudent();
      }
    });
  }


  updateAccessAppStatus(item) {
    let isAccessAppRequest;
    if (item?.isAccessApp == 0) {
      isAccessAppRequest = 1;
    } else {
      isAccessAppRequest = 0
    }
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: isAccessAppRequest == 1 ? 'student.btnAction.unlockAppAccess' : 'student.btnAction.appAccessLock', //'student.deleteUser',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: { userId: item.studentUserId, isAccessApp: isAccessAppRequest },
        service: this.studentStaffService,
        apiSubmit: (dataInput: any) => {
          return this.studentStaffService.updateAccessAppStatus(dataInput)
        },
        keyFirebaseAction: 'update-access-app-status',
        keyFirebaseModule: 'user',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getDataStudent();
      },
      (reason) => { }
    );
  }

  changePassword(item) {
    const modalRef = this.modalService.open(ModalChangePasswordComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: 'student.changePassword',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false,
      dataFromParent: {
        userId: item.studentUserId,
        account: item.fullName,
        code: item.code,
        username: item.username,//chờ be thêm
        keyFirebaseAction: 'change-password',
        keyFirebaseModule: 'user',
        apiSubmit: (dataInput: any) => {
          return this.generalService.changePasswordUser(dataInput)
        }
      }
    }
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataStudent();
      }
    }, (reason) => {

    });
  }

  getGenderName(value: number): string {
    if (value === 1)
      return translate('genderName.male');
    else if (value === 2)
      return translate('genderName.female');
    else
      return translate('genderName.other');
  }

  getStatusStudent(value: string): string {
    return STUDENT_STATUS[value];
  }

}
