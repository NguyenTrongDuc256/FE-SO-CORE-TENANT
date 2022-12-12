import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PackageMenuManagerOfSchool} from 'src/app/_models/layout-tenant/menu-manager/package-menu-manager.model';
import {MenuManagerService} from 'src/app/_services/layout-tenant/menu-manager/menu-manager.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {Router, ActivatedRoute} from '@angular/router';
import {translate} from '@ngneat/transloco';
import {
  ModalViewDetailMenuPackageComponent
} from '../../modals/modal-view-detail-menu-package/modal-view-detail-menu-package.component';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-list-menu-package',
  templateUrl: './list-menu-package.component.html',
  styleUrls: ['./list-menu-package.component.scss']
})
export class ListMenuPackageComponent implements OnInit {
  keyWord: string = '';
  isLoading: boolean = false;
  columns = [
    {
      name: 'STT',
      className: "text-center",
      width: '5%'
    },
    {
      name: 'menuManager.menuPackage',
      className: "text-left-th",
      width: '20%'
    },
    {
      name: 'menuManager.menuCode',
      className: "text-left-th",
      width: '20%'
    },
    {
      name: 'menuManager.layoutApply',
      className: "text-left-th",
      width: '45%'
    },
    {
      name: 'menuManager.activity',
      className: "text-center",
      width: '10%'
    }
  ];
  dataMenuPackage: PackageMenuManagerOfSchool[] = [];
  menuInfo: any = {
    layoutApply: 0,
    menuPackageCode: '',
    menuPackageName: '',
    customerApply: 0
  };
  dataMenuLeft: any[] = [];
  dataMenuRight: any[] = [];
  schoolId: string;
  dataFilter: PackageMenuManagerOfSchool[] = [];
  dataMenuPackageSchow: PackageMenuManagerOfSchool[] = [];

  constructor(
    private modalService: NgbModal,
    private menuManagerService: MenuManagerService,
    private showMessageService: ShowMessageService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.schoolId = this.activatedRoute.snapshot.params.id;
    if (this.schoolId) {
      this.getDataMenuPackage();
    }
  }

  getDataMenuPackage() {
    this.isLoading = true;
    this.menuManagerService.getDataMenuPackageOfSchool(this.schoolId).subscribe((res: any) => {
      this.dataMenuPackage = res.data;
      this.dataMenuPackageSchow = res.data;
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    });
  }

  searchMenuPackage(value: string): void {
    this.keyWord = value;
    this.isLoading = true;
    this.dataFilter = [];
    this.dataFilter = this.dataMenuPackage.filter(el => {
      return String(el.name).toUpperCase().includes(String(this.keyWord).toUpperCase()) || String(el.code).toUpperCase().includes(String(this.keyWord).toUpperCase());
    })
    setTimeout(() => {
      this.dataMenuPackageSchow = this.dataFilter;
      this.isLoading = false;
    }, 500);
  }

  getLayoutAppply(data) {
    let result = data.join(", ");
    return result;
  }

  getDataDetailMenuPackageManager(item) {
    this.isLoading = true;
    this.menuManagerService.getDetailMenuPackage(item.id).subscribe((res: any) => {
      this.convertDataMenu(res);
      setTimeout(() => {
        this.viewDetailMenuPackage();
        this.isLoading = false;
      }, 1000);
    })
  }

  viewDetailMenuPackage() {
    const modalRef = this.modalService.open(ModalViewDetailMenuPackageComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'xl',
        modalDialogClass: 'modal-xxl'
      });

    let data = {
      titleModal: translate('school.detailMenuPackage'),
      btnCancel: translate('btnAction.close'),
      btnAccept: 'Lưu',
      isHiddenBtnClose: false,
      dataFromParent: {
        dataMenuLeft: this.dataMenuLeft,
        dataMenuRight: this.dataMenuRight,
        menuInfo: this.menuInfo
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
    }, (reason) => {
    });
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
  }

  convertDataMenuRigth(dataMenu: any, parentId: string) {
    let dataChild: any[] = [];
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

  removeMenuPackage(item: any) {
    const modalRef = this.modalService.open(ModalDeleteComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false,
        size: 'lg',
      });

    let data = {
      titleModal: 'school.removeMenuPackage',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: {id: item.id},
        keyFirebaseAction: 'un-assign-school',
        keyFirebaseModule: 'menu-package',
        apiSubmit: (dataInput: any) => {
          return this.menuManagerService.removeMenuPackageOfSchool(item.id, this.schoolId)
        }
      }
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => {
      if (result === true) {
        this.getDataMenuPackage();
      }
    }, (reason) => {
    });
  }
}
