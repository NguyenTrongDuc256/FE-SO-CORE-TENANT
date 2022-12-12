import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "moment/moment";
import {StudentInfoAPI} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import {
  BEHAVIOR_RESET_TIME_NUMBER_TYPE,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {BehaviorStaffService} from "../../../../../_services/layout-staff/behavior-staff/behavior-staff.service";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {GeneralService} from "../../../../../_services/general.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {forkJoin} from "rxjs";
import {translate} from "@ngneat/transloco";
import {
  ModalConfirmCancelResultBehaviorComponent
} from "../../../../../_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";
import {
  ModalConfirmScoreStudentInHomeroomClassStaffComponent
} from "../../modals/modal-confirm-score-student-in-homeroom-class-staff/modal-confirm-score-student-in-homeroom-class-staff.component";

@Component({
  selector: 'app-score-student-in-homeroom-class-staff',
  templateUrl: './score-student-in-homeroom-class-staff.component.html',
  styleUrls: ['./../../../behavior-staff/style.scss','./score-student-in-homeroom-class-staff.component.scss']
})
export class ScoreStudentInHomeroomClassStaffComponent implements OnInit {

  /* component này dùng chung cho chấm điểm cộng và điểm trừ 1 hs lớp chủ nhiệm */
  timePicker: boolean = false;
  isLoading: boolean = false;
  formGroup: FormGroup;
  type: 1 | 2 = 1;
  gradeId: string;
  homeroomClassId: string;
  userId: string;
  gradingDate: string = moment(moment().format('YYYY-MM-DD')).format('X');
  studentInfo: StudentInfoAPI;
  behaviorList: any[];
  behaviorResetTimeNumberType = BEHAVIOR_RESET_TIME_NUMBER_TYPE;

  constructor(
    private behaviorServiceStaff: BehaviorStaffService,
    private showMessageService: ShowMessageService,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(e  => {
      if (e) this.homeroomClassId = e.id;
    })

    this.activatedRoute.queryParams.subscribe(el => {
      // console.log(el)
      this.type = el.subtab;
      this.userId = el.userid;
    })

    if (this.type && this.homeroomClassId && this.userId) {
      this.handleForkJoinAPI();
    }
  }

  handleForkJoinAPI() {
    this.initForm();
    this.isLoading = true
    const timeoutCallApi = setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    const APIGetStudentInfo = this.behaviorServiceStaff.getStudentInfo(this.userId);
    const APIGetBehaviorByHomeroomClass = this.behaviorServiceStaff.getBehaviorForHomeroomClass(this.homeroomClassId, this.userId, this.type);
    forkJoin([APIGetStudentInfo, APIGetBehaviorByHomeroomClass]).subscribe(
      (res: any) => {
        this.studentInfo = res[0].data || {};
        this.behaviorList = res[1].data || [];
        if (this.behaviorList.length > 0) {
          this.behaviorList.forEach(element => {
            this.addBehavior(element);
          })
        }
        this.isLoading = false;
        clearTimeout(timeoutCallApi);
      }, err => {
        this.showMessageService.error(err[0].errors.Id);
        this.showMessageService.error(err[1].errors.Id);
        this.isLoading = false;
        clearTimeout(timeoutCallApi);
      }
    );
  }

  /*1: điểm cộng, 2 điểm trừ*/
  redirectURLMark(type: 1 | 2) {
    this.type = type
    this.router.navigate(['/staff/homeroom-class/detail/', this.homeroomClassId], {
      relativeTo: this.activatedRoute,
      queryParams: { tab: "behavior", subtab: type, userid: this.userId},
    });

    if (this.type && this.homeroomClassId && this.userId) {
      this.handleForkJoinAPI();
    }
  }


  get behaviors() {
    return this.formGroup.get('behaviors') as FormArray;
  }

  addBehavior(data: any) {
    const itemForm = this.fb.group({
      id: data.id,
      name: data.name,
      code: data.code,
      avatar: data.avatar,
      behaviorCategoryName: data.behaviorCategoryName,
      gradedTimeNumber: data.gradedTimeNumber, // lần đã chấm của hs
      isApplyTimeNumber: data.isApplyTimeNumber,
      point: data.point,
      pointByTimeNumbers: data.pointByTimeNumbers ? this.fb.array(data.pointByTimeNumbers) : this.fb.array([]),
      displayPoint: 0, // số điểm hiển thị ở giao diện
      number: 0, // số lần chấm điểm của input
      comment: '', // nhận xét
      isDisplay: true, // để check ẩn hiện item khi lọc
    })
    this.behaviors.push(itemForm);
  }

  initForm() {
    this.formGroup = this.fb.group({
      homeroomClassId: [this.homeroomClassId],
      userId: [this.userId],
      date: [this.gradingDate],
      type: [this.type],
      behaviors: this.fb.array([])
    })
  }

  dataTimeOutput(event: any): void {
    if (this.gradingDate != event) {
      this.gradingDate = event;
      this.formGroup.get('date').patchValue(this.gradingDate);
    }
  }

  search(valueSearch): void {
    if (valueSearch && this.behaviors.value.length > 0) {
      valueSearch = valueSearch.trim().toLowerCase();
      this.behaviors.value.forEach((item, index) => {
        if (item.name.toLowerCase().includes(valueSearch) || item.code.toLowerCase().includes(valueSearch)) {
          (this.behaviors.at(index) as FormGroup).get('isDisplay').patchValue(true);
        } else {
          (this.behaviors.at(index) as FormGroup).get('isDisplay').patchValue(false);
        }
      })
    } else {
      if (this.behaviors.value.length > 0) {
        this.behaviors.value.forEach((item, index) => {
          (this.behaviors.at(index) as FormGroup).get('isDisplay').patchValue(true);
        })
      }
    }
  }

  getNameBehaviorResetTimeNumberType(key): string {
    let item = this.behaviorResetTimeNumberType.find(el => el.key == key);
    return item?.label || '';
  }

  changeNumber(value, index) {
    if (this.behaviors.at(index).get('isApplyTimeNumber').value == 1) {
      /* xử lý cộng điểm theo số lần chấm
      * nếu lần cộng/trừ > cấu hình lần chấm thì lấy lần cuối của cấu hình lần chấm để cộng/trừ điểm
      * */
      let point: number,
        pointLast: number,
        displayPointNew: number = 0,
        pointByTimeNumbers = this.behaviors.at(index).get('pointByTimeNumbers').value,
        gradedTimeNumber = Number(this.behaviors.at(index).get('gradedTimeNumber').value);

      for (let i = 1; i <= this.behaviors.at(index).get('number').value; i++) {
        pointLast = pointByTimeNumbers[pointByTimeNumbers.length - 1].point;
        point = pointByTimeNumbers.find(el => el.timeNumber == (gradedTimeNumber + i))?.point;
        if (point != undefined) {
          displayPointNew = displayPointNew + point;
        } else {
          displayPointNew = displayPointNew + pointLast;
        }
      }

      (this.behaviors.at(index) as FormGroup).get('displayPoint').patchValue(displayPointNew);
    } else {
      (this.behaviors.at(index) as FormGroup).get('displayPoint').patchValue(
        Number((this.behaviors.at(index) as FormGroup).get('point').value) * Number((this.behaviors.at(index) as FormGroup).get('number').value)
      );
    }
  }

  clickPlus(value, index) {
    if (this.behaviors.at(index).get('number').value <= 9) {
      (this.behaviors.at(index) as FormGroup).get('number').patchValue(
        Number(this.behaviors.at(index).get('number').value) + 1
      );
    }
  }

  clickMinus(value, index) {
    if (this.behaviors.at(index).get('number').value != 0) {
      (this.behaviors.at(index) as FormGroup).get('number').patchValue(
        Number(this.behaviors.at(index).get('number').value) - 1
      );
    }
  }

  submitForm(dataForm: any) {
    this.isLoading = true;
    if (this.formGroup.valid) {
      let validateIsChecked = this.behaviors.controls.filter(item => item.get('number').value > 0);
      if (validateIsChecked.length == 0) {
        this.isLoading = false;
        this.showMessageService.error(translate('behavior.label.errorNumberBehavior'));
      } else {
        this.isLoading = false;
        this.onModalConfirm(dataForm);
      }
    }
  }


  onModalConfirm(formValue) {
    const modalRef = this.modalService.open(
      ModalConfirmScoreStudentInHomeroomClassStaffComponent,
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
      titleModal: translate('behavior.title.confirmBehavior'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      formValue: formValue,
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result) => {
      },
      (reason) => {
      }
    );
  }

}
