import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {translate} from '@ngneat/transloco';
import {School} from 'src/app/_models/layout-tenant/school/school.model';
import {GeneralService} from 'src/app/_services/general.service';
import {SchoolService} from 'src/app/_services/layout-tenant/school/school.service';
import {ShareDataUsingService} from 'src/app/_services/share-data.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {DATA_PERMISSION, PAGE_INDEX_DEFAULT, STATUS_ACTIVE} from 'src/app/_shared/utils/constant';
import {ModalFormDiemTruongComponent} from '../../modals/modal-form-diem-truong/modal-form-diem-truong.component';

@Component({
  selector: 'app-danh-sach-diem-truong',
  templateUrl: './danh-sach-diem-truong.component.html',
  styleUrls: ['./danh-sach-diem-truong.component.scss', '../../helper.scss']
})
export class DanhSachDiemTruongComponent implements OnInit {

  keyword = '';
  arrList: Array<any> = [];
  isLoading = false;
  permission = DATA_PERMISSION;
  schoolId: string;
  infoBasicSchool: School;

  constructor(
    private modalService: NgbModal,
    private schoolService: SchoolService,
    private showMessage: ShowMessageService,
    private activatedRouter: ActivatedRoute,
    private shareDataUsingService: ShareDataUsingService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.schoolId = this.activatedRouter.snapshot.params.id;
    this.shareDataUsingService.currentApprovalStageMessage.subscribe((res: any) => {
      if (res.key == 'info-basic-school') {
        this.infoBasicSchool = res.value;
      }
    })
    this.getList();
  }

  getList() {
    this.isLoading = true;
    this.schoolService
      .danhSachDiemTruong(this.schoolId, this.keyword)
      .subscribe(
        (res: any) => {
          this.arrList = res.data && res.data != '' ? res.data : [];
          this.arrList.forEach((item, index) => {
            if (item.QuanHuyen != '' && item.QuanHuyen) {
              this.getNameDistrict(item.QuanHuyen, index)
            }
          });
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  getNameDistrict(codeDistrict: string, index: number) {
    this.isLoading = true;
    this.generalService.getNameDistrict(codeDistrict).subscribe((res: any) => {
      this.arrList[index]['TenQuanHuyen'] = res.TEN;
      this.isLoading = false;
    })
  }

  openModal(
    compo: any,
    titleModal: string,
    btnCancel: string,
    btnAccept: string,
    dataFromParent: any,
    size: string = 'lg',
    backdrop: boolean | 'static' = true
  ) {
    const modalRef = this.modalService.open(compo, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: backdrop, // prevent click outside modal to close modal
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      size: size, // 'sm' | 'md' | 'lg' | 'xl',
    });

    let data = {
      titleModal: titleModal,
      btnCancel: btnCancel,
      btnAccept: btnAccept,
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: dataFromParent,
    };

    modalRef.componentInstance.dataModal = data;
    return modalRef;
  }

  create() {
    this.isLoading = true;
    let dataFromParent = {
      CityCode: this.infoBasicSchool?.CityCode,
      arrDistrict: [],
      service: this.schoolService,
      apiSubmit: (dataInput: any) => this.schoolService.themDiemTruong(this.schoolId, dataInput),
      keyFirebaseAction: 'create',
      keyFirebaseModule: 'school-location',
      nameForm: 'create',
    };
    if (this.infoBasicSchool?.CityCode && this.infoBasicSchool?.CityCode != '') {
      this.generalService.getListDistrict(this.infoBasicSchool.CityCode).subscribe((res: any) => {
        this.isLoading = false;
        dataFromParent.arrDistrict = res;
        const modalRef = this.openModal(
          ModalFormDiemTruongComponent,
          'school.titleDialogThemDiemTruong',
          'btnAction.cancel',
          'btnAction.save',
          dataFromParent,
          'xl', 'static'
        );
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.getList();
            }
          },
          (reason) => {
            return;
          }
        );

      }, (err) => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
      const modalRef = this.openModal(
        ModalFormDiemTruongComponent,
        'school.titleDialogThemDiemTruong',
        'btnAction.cancel',
        'btnAction.save',
        dataFromParent,
        'xl', 'static'
      );
      modalRef.result.then(
        (result: boolean) => {
          if (result) {
            this.getList();
          }
        },
        (reason) => {
          return;
        }
      );
    }

  }

  update(id: string, maDiemTruong: string, value: any) {
    this.isLoading = true;
    let dataFromParent = {
      schoolId: this.schoolId,
      CityCode: this.infoBasicSchool?.CityCode,
      arrDistrict: [],
      diemTruong: value,
      service: this.schoolService,
      apiSubmit: (dataInput: any) => this.schoolService.suaDiemTruong(this.schoolId, maDiemTruong, dataInput),
      keyFirebaseAction: 'update',
      keyFirebaseModule: 'school-location',
      nameForm: 'update',
    };
    if (this.infoBasicSchool?.CityCode && this.infoBasicSchool?.CityCode != '') {
      this.generalService.getListDistrict(this.infoBasicSchool.CityCode).subscribe((res: any) => {
        this.isLoading = false;
        dataFromParent.arrDistrict = res;
        const modalRef = this.openModal(
          ModalFormDiemTruongComponent,
          'school.titleDialogSuaDiemTruong',
          'btnAction.cancel',
          'btnAction.save',
          dataFromParent,
          'xl', 'static'
        );
        modalRef.result.then(
          (result: boolean) => {
            if (result) {
              this.getList();
            }
          },
          (reason) => {
            return;
          }
        );

      }, (err) => {
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
      dataFromParent.diemTruong.QuanHuyen = null;
      const modalRef = this.openModal(
        ModalFormDiemTruongComponent,
        'school.titleDialogSuaDiemTruong',
        'btnAction.cancel',
        'btnAction.save',
        dataFromParent,
        'xl', 'static'
      );
      modalRef.result.then(
        (result: boolean) => {
          if (result) {
            this.getList();
          }
        },
        (reason) => {
          return;
        }
      );
    }

  }

  delete(code: string, name: string) {
    let dataFromParent = {
      code: code,
      dataInput: code,
      service: this.schoolService,
      apiSubmit: (dataInput: any) => this.schoolService.xoaDiemTruong(this.schoolId, dataInput),
      keyFirebaseAction: 'delete',
      keyFirebaseModule: 'school-location',
      textConfirmHeader:
        translate('school.textConfirmDeleteDiemTruong1') +
        ' ' +
        name +
        ' ' +
        translate('school.textConfirmDeleteDiemTruong2'),
    };
    const modalRef = this.openModal(
      ModalDeleteComponent,
      'school.titleDialogDeleteDiemTruong',
      'btnAction.cancel',
      'btnAction.delete',
      dataFromParent,
      'modal-md-plus'
    );

    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getList();
        }
      },
      (reason) => {
      }
    );
  }

  mapNameStatus(value: number) {
    return STATUS_ACTIVE.find((status) => status.value == value)?.label || '--';
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
    this.keyword = value.trim();
    this.getList();
  }

}
