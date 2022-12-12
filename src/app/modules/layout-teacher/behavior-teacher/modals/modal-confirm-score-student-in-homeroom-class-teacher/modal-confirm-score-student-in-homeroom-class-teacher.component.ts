import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE} from "../../../../../_shared/utils/constant";
import {Observable, Subscriber} from "rxjs";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {
  FormInputScoreStudentHomeroomClass
} from "../../../../../_models/layout-teacher/behavior/score-behavior-teacher.model";
import {GeneralService} from "../../../../../_services/general.service";
import {
  BehaviorTeacherService
} from "../../../../../_services/layout-teacher/behavior-teacher/behavior-teacher.service";

@Component({
  selector: 'app-modal-confirm-score-student-in-homeroom-class-teacher',
  templateUrl: './modal-confirm-score-student-in-homeroom-class-teacher.component.html',
  styleUrls: ['./modal-confirm-score-student-in-homeroom-class-teacher.component.scss', '../../style.scss']
})
export class ModalConfirmScoreStudentInHomeroomClassTeacherComponent implements OnInit {
  @Input() dataModal: any;
  formValue: any;
  behaviorList: any;
  isLoading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private behaviorTeacherService: BehaviorTeacherService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.formValue = this.dataModal.formValue;
    this.behaviorList = this.formValue.behaviors.filter(e => e.number > 0);
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  onSubmit(): void {
    this.isLoading = true;
    let behaviors: { behaviorId: string, number: number, comment: string }[] = []
    this.behaviorList.forEach(e => {
      behaviors.push({
        behaviorId: e.id,
        number: e.number,
        comment: e.comment.trim() == '' ? null : e.comment.trim(),
      })
    })

    let dataInput: FormInputScoreStudentHomeroomClass = {
      homeroomClassId: this.formValue.homeroomClassId,
      userId: this.formValue.userId,
      date: Number(this.formValue.date),
      type: this.formValue.type == 1 ? 1 : 2,
      behaviors: behaviors
    }

    this.listenFireBase("grade-student", "behavior-grading");
    this.behaviorTeacherService.storeScoreStudentHomeroomClass(dataInput).subscribe((res: any) => {
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
