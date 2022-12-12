import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-period-list-parent',
  templateUrl: './modal-period-list-parent.component.html',
  styleUrls: ['./modal-period-list-parent.component.scss']
})
export class ModalPeriodListParentComponent implements OnInit {
  @Input() dataModal: any;
  fromDate: number;
  toDate: number;
  listPeriod: Array<any> = [];

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.dataModal?.dataFromParent?.data?.data?.forEach(item => {
      item.period.forEach(element => {
        this.listPeriod.push(element);
      });
    });
    this.fromDate = this.dataModal.dataFromParent.fromDate;
    this.toDate = this.dataModal.dataFromParent.toDate;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}

