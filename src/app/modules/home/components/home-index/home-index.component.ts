import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements OnInit {
  needToChangePass: boolean;
  constructor(
  ) { }

  ngOnInit(): void {
    this.needToChangePass = JSON.parse(localStorage.getItem('needToChangePass'));
    if(this.needToChangePass) {
      // open modal required change password
    }
  }
}
