import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MenuManagerService } from 'src/app/_services/layout-tenant/menu-manager/menu-manager.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { LAYOUTS, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd/tree';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { translate } from '@ngneat/transloco';

@Component({
  selector: 'app-update-package-menu-manager',
  templateUrl: './update-package-menu-manager.component.html',
  styleUrls: ['./update-package-menu-manager.component.scss']
})
export class UpdatePackageMenuManagerComponent implements OnInit {
  isLoading: boolean = false;
  keyWord: string = '';
  dataSourceMenuItem = [];
  dataSourceMenuTo = [];
  dataSourceTreeNZ = [];
  dataLayouts = LAYOUTS;
  menuName: string = '';
  menuCode: string = '';
  layoutApply: string[] = [];
  dataChildrenSubmit: any[] = [];
  dataTitleMenu: any[] = [];
  idsDel: any[] = [];
  validateTitleMenu: any[] = [];
  checkValidateTitleMenu: boolean = false;
  @Input() menuPackageIdUpdate: string;
  @Output() checkEditMenuPackage = new EventEmitter<boolean>();
  @ViewChild('nzTreeComponent') nzTreeComponent!: NzTreeComponent;
  constructor(
    private menuManagerService: MenuManagerService,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) { }

  ngOnInit() {
    this.getListMenuItem();
  }

  getListMenuItem() {
    this.isLoading = true;
    this.menuManagerService.getListMenuItem(this.keyWord, '', '', 9999, 1).subscribe((res: any) => {
      this.dataSourceMenuItem = res.data?.data.filter(el => el.status == 1);
      this.dataSourceMenuItem.map((el: any) => {
        el.children = [];
        el.key = el.id;
        el.title = el.name;
      });
      if (this.dataSourceMenuTo && this.dataSourceMenuTo.length > 0) {
        this.dataSourceMenuTo.forEach(element => {
          let findFindex = this.dataSourceMenuItem.findIndex(el => el.id == element.id);
          if (findFindex != -1) {
            this.dataSourceMenuItem.splice(findFindex, 1);
          }
        })
      }
      if (this.dataSourceTreeNZ && this.dataSourceTreeNZ.length == 0) {
        this.getDetailMenuPackage();
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }, (_err: any) => {
      this.isLoading = false;
    });
  }

  getDetailMenuPackage() {
    this.isLoading = true;
    this.menuManagerService.getDetailMenuPackage(this.menuPackageIdUpdate).subscribe((res: any) => {
      this.menuName = res.name;
      this.menuCode = res.code;
      this.layoutApply = res.layouts;
      this.convertDataMenu(res);
      this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
    });
  }

  convertDataMenu(dataMenu: any) {
    dataMenu.children.forEach((element, index) => {
      // add data to dataSourceMenuTo
      this.dataSourceMenuTo.push({
        icon: element.icon,
        key: element.id,
        title: element.name,
        url: element.url,
        id: element.id,
        name: element.name,
        code: element.code,
        menuType: element.menuType,
        permissionCode: element.permissionCode,
        status: 1,
        expanded: false,
        selected: false,
        children: this.convertDataMenuRigth(dataMenu.children, element.id)
      });
      // delete data to dataSourceMenuItem
      let findIndex = this.dataSourceMenuItem.findIndex(el => el.id == element.id);
      if (findIndex != -1) {
        this.dataSourceMenuItem.splice(findIndex, 1);
      }
      // add data title
      this.dataTitleMenu[element.id] = element.title;
      // add data treeNZ
      if (element.parentId == "") {
        this.dataSourceTreeNZ.push({
          icon: element.icon,
          key: element.id,
          title: element.name,
          url: element.url,
          id: element.id,
          name: element.name,
          code: element.code,
          menuType: element.menuType,
          permissionCode: element.permissionCode,
          status: 1,
          expanded: false,
          selected: false,
          children: this.convertDataMenuRigth(dataMenu.children, element.id)
        })
      }
    });
  }

  convertDataMenuRigth(dataMenu: any, parentId: string) {
    let dataChild: any[] = [];
    dataMenu.forEach((element, index) => {
      if (element.parentId == parentId) {
        dataChild.push({
          icon: element.icon,
          key: element.id,
          title: element.name,
          url: element.url,
          id: element.id,
          name: element.name,
          code: element.code,
          menuType: element.menuType,
          permissionCode: element.permissionCode,
          status: 1,
          expanded: false,
          selected: false,
          children: this.convertDataMenuRigth(dataMenu, element.id)
        })
      }
    });
    return dataChild;
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.dataSourceTreeNZ = this.dataSourceTreeNZ.concat(this.dataSourceMenuTo[0]);
    }
  }

  nzEvent(event: NzFormatEmitEvent): void {
    if (event.eventName == 'click') {
      event.node.isExpanded = true;
    }

    if (event.eventName == 'drop') {
      event.node.isExpanded = true;
      this.dataSourceTreeNZ = [];
      let currentNodeDrop = this.nzTreeComponent.getTreeNodeByKey(event.dragNode.key);
      this.nzTreeComponent.getTreeNodes().forEach(element => {
        this.dataSourceTreeNZ.push(element.origin);
      })
      if (currentNodeDrop.key) {
        currentNodeDrop.isExpanded = true;
        this.dataSourceTreeNZ.forEach(element => {
          this.deleteChildrenNode(currentNodeDrop.key, currentNodeDrop?.parentNode?.key, element);
        })
      }
    }
  }

  deleteChildrenNode(currentNodeKey, parentNodeKey, node) {
    if (node?.children && node?.children?.length > 0) {
      node?.children.forEach((subEl, index) => {
        if (subEl.key == currentNodeKey && node.key != parentNodeKey) {
          node?.children.splice(index, 1);
        }
        this.deleteChildrenNode(currentNodeKey, parentNodeKey, subEl);
      });
    }
  }

  removeMenuItem(item: NzTreeNode) {
    this.idsDel = [];
    this.getIdsDel(item);
    if (this.idsDel && this.idsDel.length > 0) {
      this.reStoreDataDel();
    }
    item.clearChildren();
    if (item.level == 0) {
      let findFindex = this.dataSourceTreeNZ.findIndex(el => el.id == item.key);
      let findFindexTree = this.nzTreeComponent.getTreeNodes().findIndex(el => el.key == item.key);
      if (findFindex != -1) {
        this.dataSourceTreeNZ.splice(findFindex, 1);
      }
      if (findFindexTree != -1) {
        this.nzTreeComponent.getTreeNodes().splice(findFindex, 1);
      }
    } else {
      item.remove();
    }
  }

  getIdsDel(item: any) {
    this.idsDel.push(item.key);
    if (item._children && item._children.length > 0) {
      item._children.forEach(element => {
        this.getIdsDel(element);
      });
    }
  }

  reStoreDataDel() {
    this.idsDel.forEach(element => {
      let findIndex = this.dataSourceMenuTo.findIndex(el => el.id == element);
      if (findIndex != -1) {
        this.dataSourceMenuTo[findIndex].children = [];
        this.dataSourceMenuItem.push(this.dataSourceMenuTo[findIndex]);
        this.dataSourceMenuTo.splice(findIndex, 1);
      }
    })
  }

  convertDataMenuSubmit(dataMenuTree: any, parentId: string, index: number) {
    if (dataMenuTree && dataMenuTree._children && dataMenuTree._children.length > 0) {
      this.dataChildrenSubmit.push({
        id: dataMenuTree.origin.id,
        name: dataMenuTree.origin.name,
        code: dataMenuTree.origin.code,
        url: dataMenuTree.origin.url,
        permissionCode: dataMenuTree.origin.permissionCode ? dataMenuTree.origin.permissionCode : 'permission',
        icon: dataMenuTree.origin.icon,
        menuType: dataMenuTree.origin.menuType,
        subMenu: [],
        indexOrder: index,
        parentId: parentId,
        title: this.dataTitleMenu[dataMenuTree.origin.id]
      })
      dataMenuTree._children.forEach((subElement, subIndex) => {
        if (subElement && subElement._children && subElement._children.length > 0) {
          this.convertDataMenuSubmit(subElement, dataMenuTree.origin.id, subIndex);
        } else {
          this.dataChildrenSubmit.push({
            id: subElement.origin.id,
            name: subElement.origin.name,
            code: subElement.origin.code,
            url: subElement.origin.url,
            permissionCode: subElement.origin.permissionCode ? subElement.origin.permissionCode : 'permission',
            icon: subElement.origin.icon,
            menuType: subElement.origin.menuType,
            subMenu: [],
            indexOrder: index,
            parentId: dataMenuTree.origin.id,
            title: this.dataTitleMenu[subElement.origin.id]
          })
        }
      });
    } else {
      this.dataChildrenSubmit.push({
        id: dataMenuTree.origin.id,
        name: dataMenuTree.origin.name,
        code: dataMenuTree.origin.code,
        url: dataMenuTree.origin.url,
        permissionCode: dataMenuTree.origin.permissionCode ? dataMenuTree.origin.permissionCode : 'permission',
        icon: dataMenuTree.origin.icon,
        menuType: dataMenuTree.origin.menuType,
        subMenu: [],
        indexOrder: index,
        parentId: parentId,
        title: this.dataTitleMenu[dataMenuTree.origin.id]
      })
    }
  }

  saveMenuPackage() {
    this.dataChildrenSubmit = [];
    this.validateTitleMenu = [];
    this.checkValidateTitleMenu = false;
    if (!this.menuName) {
      this.showMessageService.error(translate('menuManager.validateMenupackageName'));
      return;
    }
    if (!this.menuCode) {
      this.showMessageService.error(translate('menuManager.validateMenupackageCode'));
      return;
    }
    if (this.layoutApply.length == 0) {
      this.showMessageService.error(translate('menuManager.validateMenupackageLayout'));
      return;
    }
    if (this.nzTreeComponent.getTreeNodes() && this.nzTreeComponent.getTreeNodes().length > 0) {
      this.nzTreeComponent.getTreeNodes().forEach((element, index) => {
        this.convertDataMenuSubmit(element, "", index + 1);
      });
    }
    if (this.dataChildrenSubmit && this.dataChildrenSubmit.length > 0) {
      const convertData = new Promise((resolve, reject) => {
        this.dataChildrenSubmit.forEach(element => {
          if (String(element.title).trim() == '' || typeof element.title == 'undefined') {
            this.checkValidateTitleMenu = true;
            this.validateTitleMenu[element.id] = 1;
          }
        })
        resolve(true);
      })

      convertData.then((result: any) => {
        if (!this.checkValidateTitleMenu) {
          let dataInput = {
            layoutId: this.layoutApply,
            name: this.menuName,
            code: this.menuCode,
            children: this.dataChildrenSubmit
          }
          this.listenFireBase('update', 'menu-package');
          this.updateMenuPackage(dataInput);
        } else {
          this.showMessageService.error(translate('menuManager.validateTitleMenuInpackage'));
        }
      })
    }
  }

  updateMenuPackage(dataInput) {
    this.isLoading = true;
    this.menuManagerService.updateMenuPackage(this.menuPackageIdUpdate, dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.showMessageService.error(res.msg);
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
      }
    }, (_err: any) => {
      this.isLoading = false;
    });
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
        this.checkEditMenuPackage.emit(true);
      } else {
        this.isLoading = false;
      }
    });
  }

  cancelEditMenuPackage() {
    this.checkEditMenuPackage.emit(false);
  }

  changeTitleMenu(event, key) {
    this.dataTitleMenu[key] = event.target.value;
    if (String(event.target.value).trim() == '' || typeof event.target.value == 'undefined') {
      this.validateTitleMenu[key] = 1;
    } else {
      this.validateTitleMenu[key] = 0;
    }
  }

}
