import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { Subscriber, Observable } from 'rxjs';
import { SchoolYearService } from 'src/app/_services/layout-tenant/school-year/school-year.service';

@Component({
  selector: 'app-modal-update-gradebook-input',
  templateUrl: './modal-update-gradebook-input.component.html',
  styleUrls: ['./modal-update-gradebook-input.component.scss']
})
export class ModalUpdateGradebookInputComponent implements OnInit {

  @Input() dataModal: any;
  isLoading: boolean = false;
  isSubmit: boolean = false;
  tenantId: string = '';
  schoolYearId: string = '';
  isLockGradebookInput: number;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private schoolYearService: SchoolYearService,
  ) { }

  ngOnInit(): void {
    this.tenantId = this.dataModal.dataFromParent.tenantId;
    this.schoolYearId = this.dataModal.dataFromParent.schoolYearId;
    this.isLockGradebookInput = this.dataModal.dataFromParent.dataInput;
  }

  closeModal(sendData: any) {
    if (sendData === 'accept') {
      this.updateGradebookInput();
    } else {
      this.activeModal.close(sendData);
    }
  }

  updateGradebookInput() {
    this.isSubmit = true;
    this.isLoading = true;
    let dataInput = {
      isLockGradebookInput: this.isLockGradebookInput,
    }

    this.listenFireBase("lock-gradebook-input", "admin-school-year");
    this.schoolYearService.updateGradebookInput(this.tenantId, this.schoolYearId, dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.isLoading = false;
        this.isSubmit = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
      this.isSubmit = false;
    })
  }

  listenFireBase(action: string, module: string) {
    setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.isSubmit = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.isSubmit = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
        this.isSubmit = false;
      }
    });
  }
}
