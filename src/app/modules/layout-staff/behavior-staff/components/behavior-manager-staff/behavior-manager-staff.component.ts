import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { BehaviorConfigStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-config-staff.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import { BEHAVIOR_SCORE_OBJECT_TYPE, PAGE_INDEX_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS_DEFAULT } from 'src/app/_shared/utils/constant';
import { ModalDeleteBehaviorCategoryStaffComponent } from '../../modals/modal-delete-behavior-category-staff/modal-delete-behavior-category-staff.component';
import { ModalFormBehaviorCategoryStaffComponent } from '../../modals/modal-form-behavior-category-staff/modal-form-behavior-category-staff.component';
import { ModalFormBehaviorStaffComponent } from '../../modals/modal-form-behavior-staff/modal-form-behavior-staff.component';

@Component({
  selector: 'app-behavior-manager-staff',
  templateUrl: './behavior-manager-staff.component.html',
  styleUrls: ['./behavior-manager-staff.component.scss']
})
export class BehaviorManagerStaffComponent implements OnInit {
  listAppliedObjectTypes = BEHAVIOR_SCORE_OBJECT_TYPE;
  tabActive: string = 'point-pluses';
  tabActive2: number;
  listIcon: Array<string> = [];
  isLoading: boolean = false;
  behaviorCategoryData = [];
  behaviorData = [];
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize = 0;
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  keyword: string = '';
  categoryId: string = '';
  type: number = 1;//1:điểm cộng   //2:điểm trừ
  appliedObjectTypes: number | string = '';//1:hs  //2:gv  //3:lớp chủ nhiệm

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private behaviorConfigStaffService: BehaviorConfigStaffService,
    private showMessageService: ShowMessageService,
    private modalService: NgbModal,

  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(el => {
      if (el.tab) {
        this.tabActive = el.tab;
      } else {
        this.tabActive = 'point-pluses';
        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: {
            tab: 'point-pluses'
          },
          queryParamsHandling: 'merge'
        });
      }
    })
    this.listBehaviorCategory();
  }

  listBehaviorCategory() {
    this.isLoading = true;
    this.behaviorConfigStaffService.listBehaviorCategory().subscribe((res: any) => {
      this.behaviorCategoryData = res.data;
      this.listBehavior();
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false
      this.showMessageService.error(err.msg);
    })
  }

  listBehavior() {
    this.isLoading = true;
    let dataRequest = {
      categoryId: this.categoryId,
      type: this.type,
      appliedObjectTypes: this.appliedObjectTypes,
      keyword: this.keyword,
      pageSize: this.pageSize,
      pageIndex: this.pageIndex
    }
    this.behaviorConfigStaffService.listBehavior(dataRequest).subscribe((res: any) => {
      this.behaviorData = res.data.data;
      this.collectionSize = res.data?.totalItems;
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false
      this.showMessageService.error(err.msg);
    })
  }

  search(valueSearch): void {
    this.keyword = valueSearch;
    this.listBehavior();
  }

  modalFormBehaviorCategory(item?: any) {/* Thêm/ Sửa danh mục  */
    this.isLoading = true;
    this.behaviorConfigStaffService.getListIcon().subscribe((res: any) => {
      this.listIcon = res.data;
      const modalRef = this.modalService.open(ModalFormBehaviorCategoryStaffComponent,
        {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
        });

      let data = {
        titleModal: item ? translate('behavior.editBehaviorCategory') : translate('behavior.createBehaviorCategory'),
        btnCancel: translate('btnAction.cancel'),
        btnAccept: translate('btnAction.save'),
        isHiddenBtnClose: true, // hidden/show btn close modal
        dataFromParent: item ? item : '',
        listIcon: this.listIcon,
      }

      modalRef.componentInstance.dataModal = data;
      modalRef.result.then((result) => {
        if (result == true) this.listBehaviorCategory();
      }, (reason) => {
      });
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false
      this.showMessageService.error(err.msg);
    })
  }

  deleteBehaviorCategory(item: any) {
    this.behaviorConfigStaffService.behaviorCategorySimpleList(item.id).subscribe(
      (res: any) => {
        this.isLoading = false;
        /* open modal */
        const modalRef = this.modalService.open(ModalDeleteBehaviorCategoryStaffComponent,
          {
            scrollable: true,
            windowClass: 'myCustomModalClass',
            keyboard: false,
            backdrop: 'static',
            centered: false,
            size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
            // modalDialogClass: 'modal-md-plus', // custom class, nếu muốn mở rộng size modal- thêm class modal-xxl | modal-xxxl | modal-full-screen | modal-md-plus  
          });

        let data = {
          titleModal: 'Xóa danh mục',
          btnCancel: 'btnAction.cancel',
          btnAccept: 'btnAction.confirm',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            listBehaviorCategory: res.data,
            id: item.id
          },
        }

        modalRef.componentInstance.dataModal = data;
        modalRef.result.then((result) => {
          if (result == true) this.listBehaviorCategory();
        }, (reason) => {
        });
        /* end open modal */
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessageService.error(err.msg);
      }
    );

  }

  modalFormBehavior(item?: any) { /* Thêm/ Sửa tiêu chí đánh giá */
    this.isLoading = true;
    let behaviorDetail = {}
    let codeBehavior: string = '';
    this.behaviorConfigStaffService.behaviorCategorySimpleList().subscribe((resBehaviorCategorySimpleList: any) => {
      if (item) {//update thì call api chi tiết
        this.behaviorConfigStaffService.behaviorDetail(item.id).subscribe((res: any) => {
          behaviorDetail = res.data;
          this.isLoading = false;
          const modalRef = this.modalService.open(ModalFormBehaviorStaffComponent,
            {
              scrollable: true,
              windowClass: 'myCustomModalClass',
              keyboard: false,
              backdrop: 'static',
              centered: false,
              size: 'xl',

            });

          let data = {
            titleModal: 'Chỉnh sửa tiêu chí đánh giá',
            btnCancel: translate('btnAction.cancel'),
            btnAccept: translate('btnAction.save'),
            isHiddenBtnClose: true,
            dataFromParent: { behaviorDetail: behaviorDetail },
            behaviorCategorySimpleList: resBehaviorCategorySimpleList.data,
            type: this.type, // 1: điểm cộng, 2:điểm trừ
            nameForm: 'update',
            categoryId: this.categoryId

          }

          modalRef.componentInstance.dataModal = data;
          modalRef.result.then((result) => {
            if (result == true) this.listBehaviorCategory();
          }, (reason) => {
          });

          this.isLoading = false;
        }, (err: any) => {
          this.isLoading = false
          this.showMessageService.error(err.msg);
        });
      } else {
        this.behaviorConfigStaffService.getCodeBehavior().subscribe((res: any) => {
          codeBehavior = res.data;
          this.isLoading = false;

          const modalRef = this.modalService.open(ModalFormBehaviorStaffComponent,
            {
              scrollable: true,
              windowClass: 'myCustomModalClass',
              keyboard: false,
              backdrop: 'static',
              centered: false,
              size: 'xl',
            });

          let data = {
            titleModal: 'Thêm tiêu chí đánh giá',
            btnCancel: translate('btnAction.cancel'),
            btnAccept: translate('btnAction.save'),
            isHiddenBtnClose: true,
            dataFromParent: { codeBehavior: codeBehavior },
            behaviorCategorySimpleList: resBehaviorCategorySimpleList.data,
            type: this.type, // 1: điểm cộng, 2:điểm trừ
            nameForm: 'create',
            categoryId: this.categoryId

          }
          modalRef.componentInstance.dataModal = data;
          modalRef.result.then((result) => {
            if (result == true) this.listBehaviorCategory();

          }, (reason) => {
          });

          this.isLoading = false;
        }, (err: any) => {
          this.isLoading = false
          this.showMessageService.error(err.msg);
        });
      }
      this.isLoading = false;
    }, (err: any) => {
      this.isLoading = false;
      this.showMessageService.error(err.msg);

    })
  }

  removeBehavior(id: string) {// xóa tiêu chí đánh giá
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: 'Xóa tiêu chí đánh giá',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: { id: id },
        service: this.behaviorConfigStaffService,
        apiSubmit: (dataInput: any) =>
          this.behaviorConfigStaffService.removeBehavior(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'behavior',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.listBehavior();
      },
      (reason) => { }
    );
  }


  paginationChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listBehavior();
  }

  activeTab(value: string, type: number) {
    if (type != this.type) {
      this.type = type;
      this.listBehavior();
    }

    this.tabActive = value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: value
      },
      queryParamsHandling: 'merge'
    });
  }

  changeAppliedObjectTypes() {
    this.listBehavior();
  }

  changeBehaviorCategory(tab: number, categoryId: string) {
    if (tab != this.tabActive2) {
      this.tabActive2 = tab;
      this.categoryId = categoryId;
      this.listBehavior();
    }
  }

}
