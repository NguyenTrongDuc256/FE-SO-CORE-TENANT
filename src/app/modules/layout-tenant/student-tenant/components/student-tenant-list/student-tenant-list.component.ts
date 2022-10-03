import { translate } from '@ngneat/transloco';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  MESSAGE_ERROR_CALL_API,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  STUDENT_STATUS,
  STUDENT_STATUS_SELECT,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { StudentService } from 'src/app/_services/layout-tenant/student/student.service';
import { StudentList } from 'src/app/_models/layout-tenant/student/student.model';
import { GeneralService } from 'src/app/_services/general.service';
import { ModalChangePasswordComponent } from 'src/app/_shared/modals/modal-change-password/modal-change-password.component';
import { UpdateUsernameCodeTenantComponent } from '../../modals/update-username-code-tenant/update-username-code-tenant.component';

@Component({
  selector: 'app-student-tenant-list',
  templateUrl: './student-tenant-list.component.html',
  styleUrls: ['./student-tenant-list.component.scss']
})
export class StudentTenantListComponent implements OnInit {
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

  constructor(
    private modalService: NgbModal,
    private showMessageService: ShowMessageService,
    private studentService: StudentService,
    private generalService: GeneralService

  ) {
  }

  ngOnInit(): void {
    this.getDataStudent();
    this.getStudentDataRelate();
  }

  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onChangeSchool() {
    this.dataGrades = this.studentDataRelate.grades.filter(item => item.educationStage == this.dataSchools.educationStage);//get array Grade
    if (this.schoolValue == '') {
      this.gradeValue = '';
      this.classValue = '';
    }
    this.getDataStudent();
  }

  onChangeGrade() {
    this.dataHomeroomClasses = this.studentDataRelate.homeroomClasses.filter(item => item.schoolId == this.schoolValue && item.gradeId == this.gradeValue)//get homeroomClasses
    if (this.gradeValue == '') {
      this.classValue = '';
    }
    this.getDataStudent();

  }

  onChangeClass() {
    this.getDataStudent();
  }

  onChangeStatus() {
    this.getDataStudent();
  }

  onClickSearch(valueSearch) {
    this.keyWord = valueSearch;
    this.getDataStudent();
  }

  onEventKeyupEnter(valueSearch) {
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
    this.studentService.getStudentDataRelate().subscribe((res: any) => {
      if (res.status === 1) {
        this.studentDataRelate = res.data;
        this.dataSchools = this.studentDataRelate.schools;
        this.isLoading = false;
      }

      if (res.status === 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
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
    this.studentService.getStudentList(this.pageSize, this.pageIndex, this.schoolValue, this.gradeValue, this.classValue, this.statusValue, this.keyWord).subscribe((res: any) => {
      if (res.status === 1) {
        this.collectionSize = res.data.totalItems;
        this.dataSource = res.data.data;
        this.isLoading = false;
      }

      if (res.status === 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
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
          return this.studentService.deleteStudent(dataInput)
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
        service: this.studentService,
        apiSubmit: (dataInput: any) => {
          return this.studentService.updateAccessAppStatus(dataInput)
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
        //dataInput: {
        userId: item.studentUserId,
        account: item.fullName,
        code: item.code,
        username: item.username,//chờ be thêm
        //},
        keyFirebaseAction: 'change-password',
        keyFirebaseModule: 'user',
        apiSubmit: (dataInput: any) => {
          return this.generalService.changePasswordUserLayoutTenant(dataInput)
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

  updateUsernameCode(item) {
    const modalRef = this.modalService.open(UpdateUsernameCodeTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: translate('student.updateUsernameCode'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: item,
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

  getLoginName(value: number): string {
    if (value === 1)
      return translate('user.loginTrue');
    else
      return translate('user.loginFalse');
  }

  getPasswordName(value: number): string {
    if (value === 1)
      return translate('user.passwordTrue');
    else
      return translate('user.passwordFalse');
  }
}
