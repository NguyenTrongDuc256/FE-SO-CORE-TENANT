import {Component, OnInit} from '@angular/core';
import * as moment from "moment";
export interface Breadcrumbs {
  time: String,
  name: String,
}
@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})


export class BreadcrumbsComponent implements OnInit {

  dataBreadcrumbs: Breadcrumbs = {
    time: null,
    name: null,
  }

    constructor() {
      moment.locale(localStorage.getItem('language'))
      this.dataBreadcrumbs = {
        time: `${moment().format('dddd')} ${moment().format('LL')}`,
        name: JSON.parse(localStorage.getItem('User')).FullName
      }
    }

    ngOnInit() {
    }
}

