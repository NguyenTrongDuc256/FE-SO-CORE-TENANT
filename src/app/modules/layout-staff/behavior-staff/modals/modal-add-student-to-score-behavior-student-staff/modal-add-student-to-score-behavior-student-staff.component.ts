import {Component, Input, OnInit} from '@angular/core';
import {Grade, HomeroomClass, Student} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import {
  MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {BehaviorStaffService} from "../../../../../_services/layout-staff/behavior-staff/behavior-staff.service";
import {GeneralService} from "../../../../../_services/general.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-modal-add-student-to-score-behavior-student-staff',
  templateUrl: './modal-add-student-to-score-behavior-student-staff.component.html',
  styleUrls: ['./modal-add-student-to-score-behavior-student-staff.component.scss']
})
export class ModalAddStudentToScoreBehaviorStudentStaffComponent implements OnInit {
  formGroup: FormGroup;
  isLoading: boolean = false;
  @Input() dataModal: any;
  dataStudent: any;
  studentList: Student[] = [];
  gradeList: Grade[] = [];
  homeroomClassList: HomeroomClass[] = [];
  gradeId: string = '';
  homeroomClassId: string = '';
  keyWord: string = '';
  collectionSize: number = 0;
  sizeOption: number[] = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex: number = PAGE_INDEX_DEFAULT;
  oldPageIndex: number = this.pageIndex;
  pageSize: number = PAGE_SIZE_DEFAULT;
  allChecked: boolean = false;
  totalStudentChecked: number = 0;

  dataChecked: any[] = [];
  exceptIds: string[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private behaviorStaffService: BehaviorStaffService,
    private generalService: GeneralService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getGradeList();
    this.initForm();
    this.dataStudent = this.dataModal.dataStudent;
    this.collectionSize = this.dataStudent.totalItems;
    this.exceptIds = this.dataModal.exceptIds;

    this.studentList = this.dataStudent.data || [];
    if (this.studentList.length > 0) {
      this.studentList.forEach(e => {
        this.addStudent(e);
      });
    }
  }

  get students(): FormArray {
    return this.formGroup.get('students') as FormArray;
  }

  addStudent(data: any): void {
    let itemDataChecked = this.dataChecked.find(item => item.get('id').value == data.id);
    const itemForm = this.fb.group({
      id: data.id,
      fullName: data.fullName,
      code: data.code,
      gender: data.gender,
      birthday: data.birthday || null,
      username: data.username,
      isWarningPoint: data.isWarningPoint,
      totalPoint: data.totalPoint,
      checked: !!itemDataChecked?.value?.checked,
    })
    this.students.push(itemForm);
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      students: this.fb.array([])
    })
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  onSubmit() {
    if (this.dataChecked.length == 0){
      this.showMessageService.warning('Vui lòng chọn ít nhất 1 học sinh');
      return;
    }
    this.closeModal(this.dataChecked);
  }

  search(value) {
    this.keyWord = value;
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.getStudentBySchool();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getStudentBySchool();
  }

  /*Danh sách khối*/
  getGradeList() {
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getGradeList().subscribe((res: any) => {
        this.gradeList = res.data;
        clearTimeout(timeoutCallAPI);
      },
      (err: any) => {
        this.generalService.showToastMessageError400(err);
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  // Danh sách Lớp chủ nhiệm
  getHomeroomClasslist() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getHomeroomClassList(this.gradeId).subscribe((res: any) => {
        this.homeroomClassList = res.data;
        this.isLoading = false;
        clearTimeout(timeoutCallAPI);
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  onChangeGrade() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;

    if (this.gradeId) {
      this.homeroomClassId = '';
      this.getHomeroomClasslist();
      this.getStudentBySchool();
    } else {
      this.homeroomClassId = '';
      this.homeroomClassList = [];
      this.getStudentBySchool();
    }
  }

  onChangeHomeroomClass() {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = PAGE_INDEX_DEFAULT;
    if (this.homeroomClassId) {
      this.getStudentBySchool();
    } else {
      this.getStudentBySchool();
    }
  }

  // Danh sách học sinh lớp chủ nhiệm
  getStudentBySchool() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    let body = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      keyword: this.keyWord
    }
    if (this.gradeId) {
      body['gradeId'] = this.gradeId
    }
    if (this.homeroomClassId) {
      body['homeroomClassId'] = this.homeroomClassId
    }
    if (this.exceptIds && this.exceptIds.length > 0) {
      body['exceptIds'] = this.exceptIds
    }

    this.behaviorStaffService.getStudentBySchool(body).subscribe((res: any) => {
        clearTimeout(timeoutCallAPI);
        this.studentList = [];
        this.students.clear();
        this.collectionSize = res.data.totalItems;
        this.studentList = res.data.data;
        if (this.studentList.length > 0) {
          this.studentList.forEach(e => {
            this.addStudent(e);
          });
        }
        this.updateSingleChecked();
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
        clearTimeout(timeoutCallAPI);
      }
    );
  }

  onChangeCheckAll(event): void {
    this.students.controls.forEach(item => {
      item.get('checked').patchValue(event);
    })
    this.allChecked = this.students.controls.every(item => item.get('checked').value);
  }

  updateSingleChecked(): void {
    this.allChecked = this.students.controls.every(item => item.get('checked').value);

    this.handleChecked();
    this.totalStudentChecked = this.dataChecked.length;
  }

  handleChecked() {
    this.students.controls.forEach((item, index) => {
      if (item.get('checked').value) {
        this.dataChecked.push(item);
      } else {
        let indexItem = this.dataChecked.findIndex(el => el.get('id').value === item.get('id').value);
        if (indexItem != -1){
          this.dataChecked.splice(indexItem, 1);
        }
      }
    })

    this.dataChecked = this.dataChecked.reduce((unique, o) => {
      if (!unique.some(obj => obj.get('id').value === o.get('id').value && obj.get('checked').value === o.get('checked').value)) {
        unique.push(o);
      }
      return unique;
    }, []);
  }
}
