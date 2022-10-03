import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
export interface MenuItem {
  menuIcon: string;
  menuIndex: string;
  menuName: string;
  menuRouter: string;
  isCategory?: number;
  children?: MenuItem[]
}
@Component({
  selector: 'app-menu-detail-tenant',
  templateUrl: './menu-detail-tenant.component.html',
  styleUrls: ['./menu-detail-tenant.component.scss']
})
export class MenuDetailTenantComponent implements OnInit {
  menuId: string = '';
  searchValue: string = '';
  nodes:any[] = [
    {
      icon: 'assets/images/svg/home.svg',
      key: '1',
      title: 'Trang chủ',
      menuRouter:'system.post.index',
      children: [
        { icon: 'assets/images/svg/home.svg', key: '1.1', title: 'Trang chủ 1.1', menuRouter:'system.post.index' },
        { icon: 'assets/images/svg/home.svg', key: '1.2', title: 'Trang chủ 1.2', menuRouter:'system.post.index' },
      ]
    },
    {
      icon: 'assets/images/svg/home.svg',
      key: '2',
      title: 'Trang chủ',
      menuRouter:'system.post.index',
      children: [
        { 
          icon: 'assets/images/svg/home.svg', 
          key: '2.1', 
          title: 'Trang chủ 1.1', 
          menuRouter:'system.post.index',
          children: [
            { icon: 'assets/images/svg/home.svg', key: '2.1.1', title: 'Trang chủ 2.1.1', menuRouter:'system.post.index' },
            { icon: 'assets/images/svg/home.svg', key: '2.1.2', title: 'Trang chủ 2.1.2', menuRouter:'system.post.index' },
          ] 
        },
        { icon: 'assets/images/svg/home.svg', key: '2.2', title: 'Trang chủ 1.2', menuRouter:'system.post.index' },
      ]
    },
  ];
  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuId = this.activatedRoute.snapshot.params.id;
    console.log("this.menuId", this.menuId);
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    event.node.isExpanded = !event.node.isExpanded;
  }

}
