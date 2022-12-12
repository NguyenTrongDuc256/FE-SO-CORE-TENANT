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
import { ModalImportStudentTenantComponent } from '../../modals/modal-import-student-tenant/modal-import-student-tenant.component';
import { ModalChangeUsernameCodeComponent } from 'src/app/_shared/modals/modal-change-username-code/modal-change-username-code.component';

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
  oldPageIndex = this.pageIndex;

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
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDataStudent();
  }

  onChangeSchool() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = 1;
    let schoolSelected = this.studentDataRelate.schools.find(item => item.id == this.schoolValue);
    this.dataGrades = this.studentDataRelate.grades.filter(item => item.educationStages == schoolSelected?.educationStages);
    this.gradeValue = '';
    this.classValue = '';
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
    this.studentService.getStudentDataRelate().subscribe((res: any) => {
      this.studentDataRelate = res.data;
      this.dataSchools = this.studentDataRelate.schools;
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
    this.studentService.getStudentList(this.pageSize, this.pageIndex, this.schoolValue, this.gradeValue, this.classValue, this.statusValue, this.keyWord).subscribe((res: any) => {
      this.collectionSize = res.data.totalItems;
      this.dataSource = res.data.data;
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    });
  }

  import() {
    const modalRef = this.modalService.open(ModalImportStudentTenantComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
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
        backdrop: 'static', // prevent click outside modal to close modal
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
      backdrop: 'static', // prevent click outside modal to close modal
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
        if (result) this.getDataStudent();
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
        backdrop: 'static', // prevent click outside modal to close modal
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
        username: item.username,
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
          return this.generalService.changeUsernameCodeUserLayoutTenant(dataInput)
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

  getGenderName(value: number): string {
    if (value === 1)
      return 'genderName.male';
    else if (value === 2)
      return 'genderName.female';
    else
      return 'genderName.other';
  }

  getStatusStudent(value: string): string {
    return STUDENT_STATUS[value];
  }

}
