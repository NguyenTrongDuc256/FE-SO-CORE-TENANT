import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormInputScoreStudentCourse} from "../../../../../_models/layout-staff/behavior/score-behavior-staff.model";
import {MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE} from "../../../../../_shared/utils/constant";
import {Observable, Subscriber} from "rxjs";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {BehaviorStaffService} from "../../../../../_services/layout-staff/behavior-staff/behavior-staff.service";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-modal-confirm-score-student-in-course',
  templateUrl: './modal-confirm-score-student-in-course.component.html',
  styleUrls: ['./modal-confirm-score-student-in-course.component.scss', '../../style.scss']
})
export class ModalConfirmScoreStudentInCourseComponent implements OnInit {
  @Input() dataModal: any;
  formValue: any;
  behaviorList: any;
  isLoading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private behaviorStaffService: BehaviorStaffService,
    private generalService: GeneralService,
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

    let dataInput: FormInputScoreStudentCourse = {
      courseId: this.formValue.courseId,
      userId: this.formValue.userId,
      date: Number(this.formValue.date),
      type: this.formValue.type == 1 ? 1 : 2,
      behaviors: behaviors
    }

    this.listenFireBase("grade-student", "behavior-grading");
    this.behaviorStaffService.storeScoreStudentCourse(dataInput).subscribe((res: any) => {
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
