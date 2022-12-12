import {
  TIME_OUT_LISTEN_FIREBASE,
} from './../../utils/constant';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';

@Component({
  selector: 'app-modal-confirm-cancel-result-behavior',
  templateUrl: './modal-confirm-cancel-result-behavior.component.html',
  styleUrls: ['./modal-confirm-cancel-result-behavior.component.scss'],
})
export class ModalConfirmCancelResultBehaviorComponent implements OnInit {
  isLoading = false;
  dataFromParent: any;
  dataviewConfirm: any;
  @Input() dataModal: any;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.dataviewConfirm = this.dataFromParent.dataView;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  submit() {
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );
    this.isLoading = true;
    this.dataFromParent.apiSubmit(this.dataFromParent.dataInput).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
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
        this.activeModal.close(true);
        this.isLoading = false;
      }
    });
  }
}
