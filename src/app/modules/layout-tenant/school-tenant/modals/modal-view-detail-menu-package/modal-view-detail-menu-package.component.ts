import { Component, OnInit, Input } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view-detail-menu-package',
  templateUrl: './modal-view-detail-menu-package.component.html',
  styleUrls: ['./modal-view-detail-menu-package.component.scss']
})
export class ModalViewDetailMenuPackageComponent implements OnInit {

  searchValue: string = '';
  menuInfo: any = {
    layoutApply: 0,
    menuPackageCode: '',
    menuPackageName: '',
    customerApply: 0
  };
  dataMenuLeft: any[] = [];
  dataMenuRight: any[] = [];
  @Input() dataModal: any;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.dataMenuLeft = this.dataModal.dataFromParent.dataMenuLeft;
    this.dataMenuRight = this.dataModal.dataFromParent.dataMenuRight;
    this.menuInfo = this.dataModal.dataFromParent.menuInfo;
  }

  

  nzEvent(event: NzFormatEmitEvent): void {
    event.node.isExpanded = !event.node.isExpanded;
  }

  closeModal() {
    this.activeModal.close(false);
  }

}
