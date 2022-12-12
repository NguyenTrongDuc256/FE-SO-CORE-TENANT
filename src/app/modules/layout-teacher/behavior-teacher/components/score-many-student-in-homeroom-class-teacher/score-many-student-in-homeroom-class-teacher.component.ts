import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {
  Behavior,
  BehaviorCategories,
  Grade,
  HomeroomClass,
  Student
} from "../../../../../_models/layout-teacher/behavior/score-behavior-teacher.model";
import {
  AVATAR_DEFAULT,
  BEHAVIOR_SCORE_TYPE,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {GeneralService} from "../../../../../_services/general.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {translate} from "@ngneat/transloco";
import {forkJoin} from "rxjs";
import {
  ModalConfirmScoreManyStudentInHomeroomClassTeacherComponent
} from "../../modals/modal-confirm-score-many-student-in-homeroom-class-teacher/modal-confirm-score-many-student-in-homeroom-class-teacher.component";
import {
  BehaviorTeacherService
} from "../../../../../_services/layout-teacher/behavior-teacher/behavior-teacher.service";

@Component({
  selector: 'app-score-many-student-in-homeroom-class-teacher',
  templateUrl: './score-many-student-in-homeroom-class-teacher.component.html',
  styleUrls: ['./score-many-student-in-homeroom-class-teacher.component.scss', '../../style.scss']
})
export class ScoreManyStudentInHomeroomClassTeacherComponent implements OnInit {
  timePicker: boolean = false;
  isLoading: boolean = false;
  formGroup: FormGroup;
  nzNotFoundContent: string = 'behavior.label.notFoundContent';

  maxDate: string = moment(moment().format('YYYY-MM-DD')).format('X'); // check validate không cho chọn chấm điểm tương lai
  gradingDate: string = moment(moment().format('YYYY-MM-DD')).format('X'); // ngày chấm điểm

  gradeId: string = '';
  gradeList: Grade[] = [];
  homeroomClassId: string = '';
  homeroomClassList: HomeroomClass[] = [];
  homeroomClassInfo: HomeroomClass;

  behaviorScoreTypeList = BEHAVIOR_SCORE_TYPE; /* khai báo type chấm điểm - điểm cộng/trừ */
  behaviorCategoriesList: BehaviorCategories[] = [];  /* khai báo danh mục */
  behaviorList: Behavior[] = []; /* khai báo tiêu chí */
  studentList: Student[] = [];
  avatar: string = AVATAR_DEFAULT;
  allChecked: boolean = false;
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
    private behaviorTeacherService: BehaviorTeacherService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
  ) {
  }

  ngOnInit(): void {
    this.getConfigGradingBackDate();
    this.getGradeList();
    this.getBehaviorCategoriesList();
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.gradeId) this.gradeId = el.gradeId;
      if (el.homeroomClassId) this.homeroomClassId = el.homeroomClassId;
    })

    this.initForm();

    if (this.gradeId && this.homeroomClassId) {
      this.handleForkJoinAPI();
    } else if (this.gradeId && !this.homeroomClassId) {
      this.getHomeroomClassList();
    }
  }

  /*Lấy thông tin cấu hình chấm điểm ngày quá khứu*/
  getConfigGradingBackDate() {
    this.behaviorTeacherService.getConfigGradingBackDate().subscribe(
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

  onChangeGrade(): void {
    if (this.gradeId) {
      this.homeroomClassId = '';
      this.homeroomClassInfo = undefined;
      this.studentList = [];
      this.getHomeroomClassList();
      this.router.navigate(['/teacher/behavior/many-student'], {
        relativeTo: this.activatedRoute,
        queryParams: {gradeId: this.gradeId},
      });
    } else {
      this.homeroomClassId = '';
      this.homeroomClassList = [];
      this.homeroomClassInfo = undefined;
      this.studentList = [];
      this.router.navigate(['/teacher/behavior/many-student'], {
        relativeTo: this.activatedRoute,
        queryParams: {gradeId: null, homeroomClassId: null},
      });
    }
  }

  onChangeHomeroomClass(): void {
    if (this.homeroomClassId) {
      this.getStudentByHomeroomClassList();
      this.router.navigate(['/teacher/behavior/many-student'], {
        relativeTo: this.activatedRoute,
        queryParams: {homeroomClassId: this.homeroomClassId},
        queryParamsHandling: "merge"
      });
    } else {
      this.homeroomClassInfo = undefined;
      this.studentList = [];
      this.router.navigate(['/teacher/behavior/many-student'], {
        relativeTo: this.activatedRoute,
        queryParams: {homeroomClassId: null},
        queryParamsHandling: "merge"
      });
    }
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
      if (item.get('checked').value)
        item.get('comment').patchValue(this.commentGeneral);
    })
  }

  onChangeCheckAll(event): void {
    this.studentBehaviors.controls.forEach(item => {
      item.get('checked').patchValue(event);
    })
    this.allChecked = this.studentBehaviors.controls.every(item => item.get('checked').value)
  }

  updateSingleChecked(event: boolean, index: number): void {
    if (!event) {
      let formItem = (this.studentBehaviors.at(index) as FormGroup).controls;
      formItem['comment'].patchValue('');
    } else {
      (this.studentBehaviors.at(index) as FormGroup).get('comment').patchValue(this.commentGeneral);
    }
    this.allChecked = this.studentBehaviors.controls.every(item => item.get('checked').value);
  }

  submitForm(dataForm: any) {
    this.isLoading = true;
    if (this.formGroup.valid) {
      let validateIsChecked = this.studentBehaviors.controls.filter(item => item.get('checked').value === true);
      if (validateIsChecked.length == 0) {
        this.isLoading = false;
        this.showMessage.error(translate('behavior.label.errorCheckboxStudent'));
      } else {
        this.isLoading = false;
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

  /* danh sách khối */
  getGradeList() {
    this.behaviorTeacherService.getGradeList().subscribe((res: any) => {
        this.gradeList = res.data;
      },
      (err: any) => {
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  /* danh sách lớp chủ nhiệm */
  getHomeroomClassList() {
    this.isLoading = true;
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorTeacherService.getHomeroomClassList(this.gradeId).subscribe((res: any) => {
        clearTimeout(timeoutCallApi);
        this.homeroomClassList = res.data;
        this.isLoading = false;
      },
      (err: any) => {
        clearTimeout(timeoutCallApi);
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  /* danh sách danh mục */
  getBehaviorCategoriesList() {
    this.behaviorTeacherService.getBehaviorCategoriesList().subscribe((res: any) => {
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
    this.behaviorTeacherService.getBehaviorList(behaviorCategoryId, type).subscribe(
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

  getStudentByHomeroomClassList() {
    this.isLoading = true;
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.behaviorTeacherService.getStudentByHomeroomClass(this.homeroomClassId).subscribe(
      (res: any) => {
        clearTimeout(timeoutCallApi);
        if (this.homeroomClassList && this.homeroomClassList.length > 0) {
          this.homeroomClassInfo = this.homeroomClassList.find(e => e.id == this.homeroomClassId) || undefined
        }
        this.studentList = res.data;
        this.studentBehaviors.clear();
        if (this.studentList.length > 0) {
          this.studentList.forEach(e => {
            this.addStudentBehavior(e);
          })
        }
        this.isLoading = false;
      },
      (err: any) => {
        clearTimeout(timeoutCallApi);
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  getDataConfirm(formValue): void {
    this.isLoading = true;
    let userIds: string[] = [];
    formValue.studentBehaviors.forEach(e => {
      if (e.checked) {
        userIds.push(e.id);
      }
    });

    let dataInput = {
      homeroomClassId: this.homeroomClassId,
      behaviorId: formValue.behaviorId,
      userIds: userIds,
    }

    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.behaviorTeacherService.confirmScoreHomeroomClass(dataInput).subscribe(
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
      ModalConfirmScoreManyStudentInHomeroomClassTeacherComponent,
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
      homeroomClassInfo: this.homeroomClassInfo,
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result) => {
        if (result) {
          this.allChecked = false;
          this.gradingDate = moment(moment().format('YYYY-MM-DD')).format('X'); // ngày chấm điểm
          this.initForm();
          if (this.gradeId && this.homeroomClassId) {
            this.handleForkJoinAPI();
          }
        }
      }, (reason) => {

      });
  }

  handleForkJoinAPI() {
    this.isLoading = true;
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    const APIGetHomeroomClassList = this.behaviorTeacherService.getHomeroomClassList(this.gradeId)
    const APIGetStudentByHomeroomClass = this.behaviorTeacherService.getStudentByHomeroomClass(this.homeroomClassId);
    forkJoin([APIGetHomeroomClassList, APIGetStudentByHomeroomClass]).subscribe(
      (res: any) => {
        clearTimeout(timeoutCallApi);
        this.homeroomClassList = res[0].data || [];
        if (this.homeroomClassList && this.homeroomClassList.length > 0) {
          this.homeroomClassInfo = this.homeroomClassList.find(e => e.id == this.homeroomClassId) || undefined
        }

        this.studentList = res[1].data || [];
        this.studentBehaviors.clear();
        if (this.studentList.length > 0) {
          this.studentList.forEach(e => {
            this.addStudentBehavior(e);
          })
        }
        this.isLoading = false;
      }, err => {
        clearTimeout(timeoutCallApi);
        this.generalService.showToastMessageError400(err);
        this.isLoading = false;
      }
    );
  }

  redirectURLHistoryHomeroomClass() {
    this.router.navigate(['/teacher/behavior/history-homeroom-class'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        gradeId: this.gradeId,
        homeroomClassId: this.homeroomClassId
      },
    });
  }
}
