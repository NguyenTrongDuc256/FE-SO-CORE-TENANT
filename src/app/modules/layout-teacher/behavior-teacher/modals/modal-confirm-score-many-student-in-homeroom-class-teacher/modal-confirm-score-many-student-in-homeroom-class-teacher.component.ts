import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {
  Behavior,
  BehaviorCategories, FormInputScoreManyStudentHomeroomClass,
  HomeroomClass
} from "../../../../../_models/layout-teacher/behavior/score-behavior-teacher.model";
import {AVATAR_DEFAULT, MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE} from "../../../../../_shared/utils/constant";
import {Observable, Subscriber} from "rxjs";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {GeneralService} from "../../../../../_services/general.service";
import {
  BehaviorTeacherService
} from "../../../../../_services/layout-teacher/behavior-teacher/behavior-teacher.service";

@Component({
  selector: 'app-modal-confirm-score-many-student-in-homeroom-class-teacher',
  templateUrl: './modal-confirm-score-many-student-in-homeroom-class-teacher.component.html',
  styleUrls: ['./modal-confirm-score-many-student-in-homeroom-class-teacher.component.scss', '../../style.scss']
})
export class ModalConfirmScoreManyStudentInHomeroomClassTeacherComponent implements OnInit {
  isLoading: boolean = false;
  @Input() dataModal: any;
  dataConfirm: any;
  formValue: any;
  behaviorCategoriesList: BehaviorCategories[] = [];
  behaviorList: Behavior[] = [];

  behaviorCategoriesInfo: BehaviorCategories;
  behaviorInfo: Behavior;
  homeroomClassInfo: HomeroomClass;
  dataStudent: any[] = [];
  avatar: string = AVATAR_DEFAULT;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private behaviorTeacherService: BehaviorTeacherService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.dataConfirm = this.dataModal.dataConfirm;
    this.formValue = this.dataModal.formValue;
    this.homeroomClassInfo = this.dataModal.homeroomClassInfo;
    if (this.dataModal.behaviorCategoriesList.length > 0) {
      this.behaviorCategoriesInfo = this.dataModal.behaviorCategoriesList.find(e => e.id = this.formValue.behaviorCategories);
      this.behaviorInfo = this.dataModal.behaviorList.find(e => e.id = this.formValue.behaviorId);
    }

    this.formValue.studentBehaviors.forEach(e => {
      let dataConfirmStudent = this.dataConfirm.find(item => e.id === item.userId);
      if (dataConfirmStudent != undefined) {
        this.dataStudent.push({
          id: e.id,
          avatar: e.avatar,
          fullName: e.fullName,
          code: e.code,
          comment: e.comment,
          point: dataConfirmStudent.point,
          isApplyTimeNumber: dataConfirmStudent.isApplyTimeNumber,
          timeNumber: dataConfirmStudent.timeNumber,
        })
      }
    })
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  onSubmit(): void {
    this.isLoading = true;
    let studentBehaviors = []
    this.dataStudent.forEach(e => {
      studentBehaviors.push({
        userId: e.id,
        comment: e.comment.trim() == '' ? null : e.comment.trim(),
      })
    })

    let dataInput: FormInputScoreManyStudentHomeroomClass = {
      homeroomClassId: this.homeroomClassInfo.id,
      behaviorId: this.behaviorInfo.id,
      date: Number(this.formValue.date),
      studentBehaviors: studentBehaviors
    }
    this.listenFireBase("grade-multi-student", "behavior-grading");
    this.behaviorTeacherService.storeScoreManyStudentHomeroomClass(dataInput).subscribe((res: any) => {
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err);
    })
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.closeModal(true);
      } else {
        this.isLoading = false;
      }
    });
  }
}
