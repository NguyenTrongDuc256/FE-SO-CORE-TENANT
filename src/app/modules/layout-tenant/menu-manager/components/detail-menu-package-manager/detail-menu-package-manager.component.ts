import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { MenuManagerService } from 'src/app/_services/layout-tenant/menu-manager/menu-manager.service';

@Component({
  selector: 'app-detail-menu-package-manager',
  templateUrl: './detail-menu-package-manager.component.html',
  styleUrls: ['./detail-menu-package-manager.component.scss']
})
export class DetailMenuPackageManagerComponent implements OnInit {
  searchValue: string = '';
  menuInfo: any = {
    layoutApply: 0,
    menuPackageCode: '',
    menuPackageName: '',
    customerApply: 0
  };
  dataMenuLeft: any[] = [];
  dataMenuRight: any[] = [];
  checkShowMenu:boolean = false;
  @Input() menuPackageManagerId:string;
  @Output() checkCloseDetailMenuPackage = new EventEmitter<any>();
  constructor(
    private menuManagerService: MenuManagerService
  ) { }

  ngOnInit() {
    if (this.menuPackageManagerId) {
      this.getDataDetailMenuPackageManager();
    }
  }

  getDataDetailMenuPackageManager() {
    this.menuManagerService.getDetailMenuPackage(this.menuPackageManagerId).subscribe((res: any) => {
      this.convertDataMenu(res);
    })
  }

  convertDataMenu(dataMenu: any) {
    // convert infomation menu
    this.menuInfo.layoutApply = dataMenu.layouts.length;
    this.menuInfo.menuPackageCode = dataMenu.code;
    this.menuInfo.menuPackageName = dataMenu.name;
    this.menuInfo.customerApply = 10;

    // convert data menu left
    this.dataMenuLeft = dataMenu.children.filter(el => el.parentId == "");
    // convert data menu right
    dataMenu.children.forEach((element, index) => {
      if (element.parentId == "") {
        this.dataMenuRight.push({
          icon: element.icon,
          key: element.title,
          title: element.name,
          menuRouter: element.url,
          id: element.id,
          children: this.convertDataMenuRigth(dataMenu.children, element.id)
        })
      }
    });

    setTimeout(() => {
      this.checkShowMenu = true;
    }, 500);

  }

  convertDataMenuRigth(dataMenu: any, parentId: string) {
    let dataChild:any[] = [];
    dataMenu.forEach((element, index) => {
      if (element.parentId == parentId) {
        dataChild.push({
          icon: element.icon,
          key: element.title,
          title: element.name,
          menuRouter: element.url,
          id: element.id,
          children: this.convertDataMenuRigth(dataMenu, element.id)
        })
      }
    });
    return dataChild;
  }

  nzEvent(event: NzFormatEmitEvent): void {
    event.node.isExpanded = !event.node.isExpanded;
  }

  cancelDetailMenuPackage(){
    this.checkCloseDetailMenuPackage.emit({status:1,id:null});
  }

  updateMenuPackage(){
    this.checkCloseDetailMenuPackage.emit({status:2,id:this.menuPackageManagerId});
  }

}
