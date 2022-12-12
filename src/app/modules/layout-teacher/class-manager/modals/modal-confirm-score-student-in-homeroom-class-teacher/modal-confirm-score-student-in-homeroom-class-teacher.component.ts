import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { FormInputScoreStudentHomeroomClass } from 'src/app/_models/layout-teacher/class-manager/score-behavior-teacher.model';
import { BehaviorTeacherService } from 'src/app/_services/layout-teacher/class-manager/behavior-teacher.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-confirm-score-student-in-homeroom-class-teacher',
  templateUrl: './modal-confirm-score-student-in-homeroom-class-teacher.component.html',
  styleUrls: ['../../../class-manager/style.scss', './modal-confirm-score-student-in-homeroom-class-teacher.component.scss']
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
      this.showMessageService.error(_err.msg);
    })
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading === true) {
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
