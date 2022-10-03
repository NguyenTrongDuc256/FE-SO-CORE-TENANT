import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-lock-login',
  templateUrl: './modal-lock-login.component.html',
  styleUrls: ['./modal-lock-login.component.scss']
})
export class ModalLockLoginComponent implements OnInit {
  @Input() dataModal: any;
  timeLeft: number;
  interval;
  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.timeLeft = this.dataModal.dataFromParent;
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.closeModal(true);
      }
    }, 1000)
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}
