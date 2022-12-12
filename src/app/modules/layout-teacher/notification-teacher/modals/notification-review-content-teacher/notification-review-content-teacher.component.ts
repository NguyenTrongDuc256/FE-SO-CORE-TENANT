import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notification-review-content-teacher',
  templateUrl: './notification-review-content-teacher.component.html',
  styleUrls: ['./notification-review-content-teacher.component.scss']
})
export class NotificationReviewContentTeacherComponent implements OnInit {
  @Input() dataModal: any;
  view: number = 1;

  // 1: màn máy tính
  // 2: màn điện thoại
  // 3: màn máy tính bảng

  constructor(
  ) { }

  ngOnInit(): void {
    console.log(this.dataModal)
  }

  click(type){
    const data =  document.getElementsByClassName("modal-dialog-scrollable")[0];
    this.view = type;
    switch (type){
      case 1: {
        data.classList.remove("modal-sm-plus");
        data.classList.remove("modal-md-plus");
        data.classList.add('modal-xl')

        break
      }
      case 2: {
        data.classList.remove("modal-xl");
        data.classList.remove("modal-md-plus");
        data.classList.add('modal-sm-plus')
        break
      }
      case 3: {
        data.classList.remove("modal-xl");
        data.classList.remove("modal-sm-plus");
        data.classList.add('modal-md-plus')
        break
      }
    }
  }

}
