import {Component, OnInit} from '@angular/core';
import {
  AVATAR_DEFAULT,
  BEHAVIOR_SCORE_TYPE,
  DATA_PERMISSION,
  MESSAGE_ERROR_CALL_API,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {
  Behavior,
  BehaviorCategories,
  Student
} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {GeneralService} from "../../../../../_services/general.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {translate} from "@ngneat/transloco";
import {
  ModalAddStudentToScoreBehaviorStudentStaffComponent
} from "../../modals/modal-add-student-to-score-behavior-student-staff/modal-add-student-to-score-behavior-student-staff.component";
import {BehaviorStaffService} from "../../../../../_services/layout-staff/behavior-staff/behavior-staff.service";
import {
  ModalConfirmScoreManyStudentComponent
} from "../../modals/modal-confirm-score-many-student/modal-confirm-score-many-student.component";

@Component({
  selector: 'app-score-behavior-index-student-staff',
  templateUrl: './score-behavior-index-student-staff.component.html',
  styleUrls: ['./score-behavior-index-student-staff.component.scss', '../../style.scss']
})
export class ScoreBehaviorIndexStudentStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  timePicker: boolean = false;
  isLoading: boolean = false;
  formGroup: FormGroup;
  nzNotFoundContent: string = 'behavior.label.notFoundContent';

  maxDate: string = moment(moment().format('YYYY-MM-DD')).format('X'); // check validate không cho chọn chấm điểm tương lai
  gradingDate: string = moment(moment().format('YYYY-MM-DD')).format('X'); // ngày chấm điểm

  behaviorScoreTypeList = BEHAVIOR_SCORE_TYPE; /* khai báo type chấm điểm - điểm cộng/trừ */
  behaviorCategoriesList: BehaviorCategories[] = [];  /* khai báo danh mục */
  behaviorList: Behavior[] = []; /* khai báo tiêu chí */
  studentList: Student[] = [];
  avatar: string = AVATAR_DEFAULT;
  commentGeneral: string = '';
  numberGradingBackDate: number; // Số ngày được chấm điểm trong ngày quá khứ
  checkMinDate: number = Number(moment(moment().format('YYYY-MM-DD')).format('X')); // Số ngày được chấm điểm trong ngày quá khứ



  validationMessages: any = {
    behaviorCategories: [
      {
        type: "required",
        message: 'behavior.validators.behaviorCategories.required',
      },
    ],
    behaviorId: [
      {
        type: "required",
        message: 'behavior.validators.behaviorId.required',
      },
    ],
  }
  validationMessagesServer = {
    behaviorCategories: {},
    behaviorId: {},
  }

  constructor(
    private showMessageService: ShowMessageService,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private behaviorStaffService: BehaviorStaffService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
  ) {
  }

  ngOnInit(): void {
    this.getConfigGradingBackDate();
    this.getBehaviorCategoriesList();
    this.initForm();
  }

  /*Lấy thông tin cấu hình chấm điểm ngày quá khứu*/
  getConfigGradingBackDate() {
    this.behaviorStaffService.getConfigGradingBackDate().subscribe(
      (res: any) => {
        this.numberGradingBackDate = res.data;
      },
      (err: any) => {
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  get studentBehaviors(): FormArray {
    return this.formGroup.get('studentBehaviors') as FormArray;
  }

  addStudentBehavior(data: any): void {
    const itemForm = this.fb.group({
      id: data.id,
      fullName: data.fullName,
      code: data.code,
      gender: data.gender,
      avatar: data.avatar,
      totalPoint: data.totalPoint,
      isWarningPoint: data.isWarningPoint,
      isChecked: false,
      comment: '',
      displayPoint: 0,
      checked: false,
      isDisplay: true, // để check ẩn hiện item khi lọc
    })
    this.studentBehaviors.push(itemForm);
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      behaviorScoreType: [this.behaviorScoreTypeList[0].key, Validators.required],
      behaviorCategories: ['', Validators.required],
      behaviorId: ['', Validators.required],
      date: [this.gradingDate, [Validators.required]],
      studentBehaviors: this.fb.array([])
    })
  }


  getStudentBySchool(): void {
    this.isLoading = true;
    let body = {
      pageSize: PAGE_SIZE_DEFAULT,
      pageIndex: PAGE_INDEX_DEFAULT,
    }
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    if (this.studentBehaviors.length > 0) {
      body['exceptIds'] = this.studentBehaviors.value.map(element => element.id)
    }

    this.behaviorStaffService.getStudentBySchool(body).subscribe(
      (res: any) => {
        clearTimeout(timeoutCallApi);
        this.isLoading = false;
        this.openModalAddStudentToScoreBehaviorStudent(res.data);
      },
      (err: any) => {
        clearTimeout(timeoutCallApi);
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  openModalAddStudentToScoreBehaviorStudent(dataStudent: any) {
    const modalRef = this.modalService.open(
      ModalAddStudentToScoreBehaviorStudentStaffComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
      }
    );
    let data = {
      titleModal: 'behavior.title.addStudent',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'behavior.label.add',
      isHiddenBtnClose: true,
      dataStudent: dataStudent,
      exceptIds: this.studentBehaviors.value.map(element => element.id),
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result) => {
        if (result && result.length > 0) {
          result.forEach(e => {
            this.addStudentBehavior(e.value);
          })
        }
      }, (reason) => {

      });
  }

  dataTimeOutput(event: any): void {
    if (this.gradingDate != event) {
      this.gradingDate = event;
      this.formGroup.get('date').patchValue(this.gradingDate);
    }
  }

  search(valueSearch): void {
    if (valueSearch && this.studentBehaviors.value.length > 0) {
      valueSearch = valueSearch.trim().toLowerCase();
      this.studentBehaviors.value.forEach((item, index) => {
        if (item.fullName.toLowerCase().includes(valueSearch) || item.code.toLowerCase().includes(valueSearch)) {
          (this.studentBehaviors.at(index) as FormGroup).get('isDisplay').patchValue(true);
        } else {
          (this.studentBehaviors.at(index) as FormGroup).get('isDisplay').patchValue(false);
        }
      })
    } else {
      if (this.studentBehaviors.value.length > 0) {
        this.studentBehaviors.value.forEach((item, index) => {
          (this.studentBehaviors.at(index) as FormGroup).get('isDisplay').patchValue(true);
        })
      }
    }
  }

  onChangeBehaviorScoreType(): void {
    if (this.formGroup.value.behaviorScoreType && this.formGroup.value.behaviorCategories) {
      this.getBehaviorList(this.formGroup.value.behaviorCategories, this.formGroup.value.behaviorScoreType);
      this.formGroup.get('behaviorId').patchValue('');
    } else {
      this.formGroup.get('behaviorId').patchValue('');
      this.behaviorList = []
    }
  }

  onChangeBehaviorCategories(event): void {
    if (event) {
      this.getBehaviorList(this.formGroup.value.behaviorCategories, this.formGroup.value.behaviorScoreType);
      this.formGroup.get('behaviorId').patchValue('');
    } else {
      this.formGroup.get('behaviorId').patchValue('');
      this.behaviorList = []
    }
  }

  onChangeCommentGeneral(event): void {
    this.commentGeneral = event;
    this.studentBehaviors.controls.forEach((item, index) => {
      item.get('comment').patchValue(this.commentGeneral);
    })
  }

  submitForm(dataForm: any) {
    this.isLoading = true;
    if (this.formGroup.valid) {
      if (this.studentBehaviors.length == 0) {
        this.isLoading = false;
        this.showMessage.error(translate('behavior.label.errorCheckboxStudent'));
        return;
      } else {
        this.getDataConfirm(dataForm);
      }
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        })
      }
    });
  }

  validateAllFormFieldsErrorServer(error: any) {
    Object.keys(error).forEach(key => {
      Object.keys(this.validationMessages).forEach(itemMessage => {
        if (key == itemMessage) {
          this.validationMessagesServer[itemMessage] = {
            type: "errorServer",
            message: error[key]
          }
        }
      });
    });
  }

  cancelForm() {

  }

  /* danh sách danh mục */
  getBehaviorCategoriesList() {
    this.behaviorStaffService.getBehaviorCategoriesList().subscribe((res: any) => {
        this.behaviorCategoriesList = res.data;
      },
      (err: any) => {
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getBehaviorList(behaviorCategoryId: string, type: number) {
    this.isLoading = true;
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorStaffService.getBehaviorList(behaviorCategoryId, type).subscribe(
      (res: any) => {
        clearTimeout(timeoutCallApi);
        this.behaviorList = res.data;
        this.isLoading = false;
      },
      (err: any) => {
        clearTimeout(timeoutCallApi);
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  getDataConfirm(formValue): void {
    console.log(12333);
    this.isLoading = true;
    let userIds: string[] = [];
    formValue.studentBehaviors.forEach(e => {
      userIds.push(e.id);
    });

    let dataInput = {
      behaviorId: formValue.behaviorId,
      userIds: userIds,
    }

    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.behaviorStaffService.getConfirmScoreStudent(dataInput).subscribe(
      (res: any) => {
        clearTimeout(timeoutCallApi);
        this.onModalConfirm(res.data, formValue);
        this.isLoading = false;
      },
      (err: any) => {
        clearTimeout(timeoutCallApi);
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  onModalConfirm(dataConfirm, formValue) {
    const modalRef = this.modalService.open(
      ModalConfirmScoreManyStudentComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
      }
    );
    let data = {
      titleModal: translate('behavior.title.scoringHistory'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataConfirm: dataConfirm,
      formValue: formValue,
      behaviorCategoriesList: this.behaviorCategoriesList,
      behaviorList: this.behaviorList,
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.gradingDate = moment(moment().format('YYYY-MM-DD')).format('X'); // ngày chấm điểm
          this.initForm();

        }
      }, (reason) => {

      });
  }

  deleteStudent(index: number) {
    this.studentBehaviors.removeAt(index);
  }
}
