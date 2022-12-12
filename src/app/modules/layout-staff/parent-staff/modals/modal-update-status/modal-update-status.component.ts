import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {UserService} from "../../../../../_services/layout-tenant/user/user.service";
import {MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE} from "../../../../../_shared/utils/constant";
import {Observable, Subscriber} from "rxjs";

@Component({
  selector: 'app-modal-update-status',
  templateUrl: './modal-update-status.component.html',
  styleUrls: ['./modal-update-status.component.scss']
})
export class ModalUpdateStatusComponent implements OnInit {

  @Input() dataModal: any;
  isLoading: boolean = false;
  isSubmit: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  updateStatus() {
    this.isLoading = true;
    this.isSubmit = true;
    let dataInput = {
      userId: this.dataModal.dataFromParent.userId,
      isActive: this.dataModal.dataFromParent.dataInput,
    }
    this.listenFireBase("update-status", "user");
    this.userService.updateStatus(dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
        this.isSubmit = false;
      }
    }, (_err: any) => {
      this.isLoading = false;
      this.isSubmit = false;
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
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }

}
