
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { BehaviorConfigStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-config-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
@Component({
  selector: 'app-modal-gen-Initial-point-confirm-staff',
  templateUrl: './modal-gen-Initial-point-confirm-staff.component.html',
  styleUrls: ['./modal-gen-Initial-point-confirm-staff.component.scss']
})
export class ModalGenInitialPointConfirmStaffComponent implements OnInit {
  isLoading = false;
  dataFromParent: any;
  @Input() dataModal: any;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private behaviorConfigStaffService: BehaviorConfigStaffService,
    private showMessageService: ShowMessageService,


  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  submit() {
    this.isLoading = true;
    this.listenFireBase('gen-initial-point', 'behavior-config');
    this.behaviorConfigStaffService.genInitialPoint(this.dataFromParent).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.showMessage.success(res.msg);
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessageService.error(err.msg);
      }
    );
  }

  listenFireBase(action: string, module: string) {
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
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }
}
