import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-guide-daily-comment',
  templateUrl: './modal-guide-daily-comment.component.html',
  styleUrls: ['./modal-guide-daily-comment.component.scss']
})
export class ModalGuideDailyCommentComponent implements OnInit {

  @Input() dataModal: any;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    console.log(this.dataModal);
  }

  closeModal() {
    this.activeModal.close();
  }

}
