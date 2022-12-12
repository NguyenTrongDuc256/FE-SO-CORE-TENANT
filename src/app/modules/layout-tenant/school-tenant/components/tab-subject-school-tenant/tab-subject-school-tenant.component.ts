import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {translate} from '@ngneat/transloco';
import {Subject} from 'src/app/_models/layout-tenant/subject/subject.model';
import {SchoolService} from 'src/app/_services/layout-tenant/school/school.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  DATA_PERMISSION, PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
  ARR_TYPE_OF_SUBJECT
} from 'src/app/_shared/utils/constant';
import {ModalAssignSubjectComponent} from '../../modals/modal-assign-subject/modal-assign-subject.component';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-tab-subject-school-tenant',
  templateUrl: './tab-subject-school-tenant.component.html',
  styleUrls: [
    './tab-subject-school-tenant.component.scss',
    '../../helper.scss',
  ],
})
export class TabSubjectSchoolTenantComponent implements OnInit {
  keyword = '';
  arrList: Array<Subject> = [];
  pageIndex = PAGE_INDEX_DEFAULT; // Trang hiện tại
  pageSize = PAGE_SIZE_DEFAULT; // Số bản ghi trong 1 trang
  collectionSize = 0; // Tổng số lượng bản ghi
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT; // Thay đổi pageSize
  isLoading = false;
  permission = DATA_PERMISSION;
  schoolId: string;
  typeSubject: number = null;
  arrTypeSubjects = ARR_TYPE_OF_SUBJECT;
  oldPageIndex = this.pageIndex;

  constructor(
    private modalService: NgbModal,
    private schoolService: SchoolService,
    private showMessage: ShowMessageService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.schoolId = res.id;
      this.getList();
    });
  }

  getList() {
    this.isLoading = true;
    this.schoolService
      .getListSubject(this.schoolId, this.keyword, this.typeSubject, this.pageSize, this.pageIndex)
      .subscribe(
        (res: any) => {
          this.arrList = res.data.data;
          this.arrList.forEach((item) => {
            item['subjectTypeName'] =
              this.arrTypeSubjects.find((i) => i.value == item.subjectType)
                .label || '--';
          });
          this.collectionSize = res.data?.totalItems;
          this.isLoading = false;
        },
        (err) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  assign() {
    this.isLoading = true;
    this.schoolService.getListSubjectToAssign(this.schoolId, '', null).subscribe(
      (res: any) => {

        this.isLoading = false;
        const modalRef = this.modalService.open(ModalAssignSubjectComponent, {
          scrollable: true,
          windowClass: 'myCustomModalClass',
          keyboard: false,
          backdrop: 'static', // prevent click outside modal to close modal
          centered: false, // vị trí hiển thị modal ở giữa màn hình
          size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
        });

        let data = {
          titleModal: 'school.assignSubject',
          btnCancel: 'btnAction.cancel',
          btnAccept: 'btnAction.save',
          isHiddenBtnClose: false, // hidden/show btn close modal
          dataFromParent: {
            schoolId: this.schoolId,
            service: this.schoolService,
            arrList: res.data,
            apiGetList: (
              schoolId: string,
              subjectType: number | null,
              keyWord: string = ''
            ) =>
              this.schoolService.getListSubjectToAssign(
                schoolId,
                keyWord,
                subjectType
              ),
            apiSubmit: (schoolId: string, dataInput: any) =>
              this.schoolService.assignSubject(schoolId, dataInput),
            keyFirebaseAction: 'create',
            keyFirebaseModule: 'school-subject',
          },
        };

        modalRef.componentInstance.dataModal = data;
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.pageIndex = PAGE_INDEX_DEFAULT;
              this.oldPageIndex = this.pageIndex;
              this.getList();
            }
          },
          (reason) => {
          }
        );

      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  remove(id: string, name: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'school.titleDialogDeleteGrade',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: {schoolId: this.schoolId, subjectId: id},
        service: this.schoolService,
        apiSubmit: (dataInput: any) =>
          this.schoolService.deleteSubject(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'school-subject',
        textConfirmHeader:
          translate('school.textConfirmDeleteSubject1') +
          ' ' +
          name +
          ' ' +
          translate('school.textConfirmDeleteSubject2'),
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.pageIndex = PAGE_INDEX_DEFAULT;
          this.oldPageIndex = this.pageIndex;
          this.getList();
        }
      },
      (reason) => {
      }
    );
  }

  search(event, value: string) {
    // if (event.key === 'Enter' || event.key === 'Tab') {
    //   this.searchByValue(value);
    // }
    if (event.key === 'Enter') {
      this.searchByValue(value);
    }
  }

  searchClickIcon(value: string) {
    this.searchByValue(value);
  }

  searchByValue(value: string) {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.oldPageIndex = this.pageIndex;
    this.keyword = value.trim();
    this.getList();
  }

  filter() {
    this.pageIndex = PAGE_INDEX_DEFAULT;
    this.oldPageIndex = this.pageIndex;
    this.getList();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getList();
  }
}
