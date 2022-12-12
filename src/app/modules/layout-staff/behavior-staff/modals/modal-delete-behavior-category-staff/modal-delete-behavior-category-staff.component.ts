import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { BehaviorConfigStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-config-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-delete-behavior-category-staff',
  templateUrl: './modal-delete-behavior-category-staff.component.html',
  styleUrls: ['./modal-delete-behavior-category-staff.component.scss']
})
export class ModalDeleteBehaviorCategoryStaffComponent implements OnInit {
  isLoading = false;
  isMoveBehaviors: boolean = false;
  behaviorCategoryId: string = '';
  dataFromParent: any;
  @Input() dataModal: any;

  constructor(
    public activeModal: NgbActiveModal,
    private listenFirebaseService: ListenFirebaseService,
    private behaviorConfigStaffService: BehaviorConfigStaffService,
    private showMessageService: ShowMessageService,

  ) { }

  ngOnInit(): void {
    this.behaviorCategoryId = this.dataModal.dataFromParent.listBehaviorCategory[0].id;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  submit() {
    this.isLoading = true;
    this.listenFireBase('delete', 'behavior-category');
    let dataRequest = {
      id: this.dataModal.dataFromParent.id,//id danh mục
      isMoveBehaviors: this.isMoveBehaviors ? 1 : 0,
      behaviorCategoryId: this.isMoveBehaviors ? this.behaviorCategoryId : null
    }
    this.behaviorConfigStaffService.deleteCehaviorCategory(dataRequest).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessageService.error(err.msg);
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
        this.isLoading = false;
      }
    });
  }
}

