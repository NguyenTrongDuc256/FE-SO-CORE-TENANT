import { Component, OnInit, Input  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModuleManagerService } from 'src/app/_services/layout-tenant/module-manager/module-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';

@Component({
  selector: 'app-modal-permission-of-module-tenant',
  templateUrl: './modal-permission-of-module-tenant.component.html',
  styleUrls: ['./modal-permission-of-module-tenant.component.scss']
})
export class ModalPermissionOfModuleTenantComponent implements OnInit {

  @Input() dataModal: any;

  totalPermission: number;
  dataPermission: any[] = [];
  isLoading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if(this.dataModal.dataFromParent){
      this.totalPermission = this.dataModal.dataFromParent.length;
      this.dataPermission = this.chunkArray(this.dataModal.dataFromParent, 4);
    }
  }

  chunkArray(myArray, chunkSize) {
    let arrNew = [];
    while (myArray.length) {
      arrNew.push(myArray.splice(0, chunkSize));
    }
    return arrNew;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
