import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import * as moment from "moment";
@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']

})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: Breadcrumb[];
  showBreadcrumbs = [];
  listBreadCrumbs = [
    {
      data: [
        {url: '/', title: `Trang chủ`, icon: null, color: null},
      ], type: '/parent/home'
    },
    {
      data: [
        {url: '/', title: 'Phụ huynh', icon: 'fa fa-chalkboard-teacher', color: null},
      ],
      type: '/tenant/parent'
    },
    {
      data: [
        {url: '/', title: 'Phụ huynh', icon: 'fa fa-fire-alt', color: null},
      ],
      type: '/tenant/parent/create'
    },
    {
      data: [
        {url: '/', title: 'Phụ huynh', icon: 'fa fa-fire-alt', color: null},
      ],
      type: '/tenant/parent/edit'
    },
    {
      data: [
        {url: '/', title: 'Hoạt động', icon: 'fa fa-fire-alt', color: null},
      ],
      type: '/tenant/role'
    },
  ];


  constructor(private router: Router, private route: ActivatedRoute) {
    moment().locale(localStorage.getItem('language'))
  }

  ngOnInit() {
    this.customUrl();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.customUrl();
    });

  }

  customUrl() {
    let root: ActivatedRoute = this.route.root;
    this.breadcrumbs = this.getBreadcrumbs(root);
    this.breadcrumbs = [...this.breadcrumbs];
    this.handelBreadcrumbs(this.breadcrumbs[this.breadcrumbs.length - 1].url);
  }

  handelBreadcrumbs(param: string) {
    this.showBreadcrumbs = [];
    let data = param.split('/');
    const flag = this.listBreadCrumbs.find(i => i.type === param);
    this.listBreadCrumbs.forEach(i => {
      // console.log(11111)
      // console.log(param.includes(i.type))
      // console.log(i.type)
      // i.type === param
    });
    if (flag) {
      this.showBreadcrumbs = flag.data;
      return;
    }
    // data.forEach(item => {
    //     const flag = this.listBreadCrumbs.find(i => i.type === param);
    //     if (flag) {
    //         this.showBreadcrumbs = flag.data;
    //         return;
    //     }
    // });
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'title';
    let children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }
    for (let child of children) {
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length == 0) continue;
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");
      let data = routeURL.split('/');
      if (data.length === 2 && this.isValidGUID(data[1]) ){
        routeURL = data[0]
      }
      url += `/${routeURL}`;
      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url
      };
      breadcrumbs.push(breadcrumb);
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }


  isValidGUID(str) {
    // Regex to check valid
    // GUID (Globally Unique Identifier)
    const regex = "^[{]?[0-9a-fA-F]{8}"
      + "-([0-9a-fA-F]{4}-)"
      + "{3}[0-9a-fA-F]{12}[}]?$";
    const regex1 = new RegExp(regex);
    return regex1.test(str)
    // Compile the ReGex
  }
}



export interface Breadcrumb {
    label: string;
    url: string;
}
