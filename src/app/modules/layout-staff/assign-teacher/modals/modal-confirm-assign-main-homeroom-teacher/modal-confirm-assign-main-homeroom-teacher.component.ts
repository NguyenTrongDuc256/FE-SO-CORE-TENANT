import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-confirm-assign-main-homeroom-teacher',
  templateUrl: './modal-confirm-assign-main-homeroom-teacher.component.html',
  styleUrls: ['./modal-confirm-assign-main-homeroom-teacher.component.scss']
})
export class ModalConfirmAssignMainHomeroomTeacherComponent implements OnInit {

  @Input() dataModal: any;
  dataFromParent: any;
  isLoading = false;
  moveOutStatus = moveOutStatusEnum.ASSIGN_MAIN_HOMEROOM_TEACHER;
  moveOutStatusEnum = moveOutStatusEnum;

  constructor(
    private listenFirebaseService: ListenFirebaseService,
    public activeModal: NgbActiveModal,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
  }

  submit() {
    if(this.dataFromParent?.classInfo?.oldTeacherId) {
      this.dataFromParent.dataInput.moveOut = this.moveOutStatus;
    } else {
      this.dataFromParent.dataInput.moveOut = this.moveOutStatusEnum.NOT_HAVE_MAIN_HOMEROOM_TEACHER;
    }
    this.listenFireBase(this.dataFromParent.keyFirebaseAction, this.dataFromParent.keyFirebaseModule);
    this.dataFromParent.apiSubmit(this.dataFromParent.dataInput).subscribe(
      (res: any) => {},
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }
}

export enum moveOutStatusEnum {MOVE_OUT_CLASS = 2, ASSIGN_MAIN_HOMEROOM_TEACHER = 1, NOT_HAVE_MAIN_HOMEROOM_TEACHER = 0}
