import {Component, OnInit} from '@angular/core';
import {
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
} from 'src/app/_shared/utils/constant';
import {ProfileStaffService} from '../../../../../_services/layout-staff/declare/profile-staff.service';
import {ShowMessageService} from '../../../../../_services/show-message.service';
import {translate} from '@ngneat/transloco';
import {ModalDeleteComponent} from '../../../../../_shared/modals/modal-delete/modal-delete.component';
import {ProfileFormStaffComponent} from '../../modals/profile-form-staff/profile-form-staff.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileStaff} from '../../../../../_models/layout-staff/declare/profile-list-staff';
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-profile-list-staff',
  templateUrl: './profile-list-staff.component.html',
  styleUrls: ['./profile-list-staff.component.scss'],
})
export class ProfileListStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  keyWord: string = '';
  type: number | string = '';
  isImperative: number | string = '';
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize = 0;
  oldPageIndex = this.pageIndex;
  isLoading: boolean = false;
  listProfileStaff: ProfileStaff[];

  constructor(
    private profileStaffService: ProfileStaffService,
    private showMessage: ShowMessageService,
    private modalService: NgbModal,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.getListProfileStaff();
  }

  getListProfileStaff() {
    this.isLoading = true;
    let dataRequest = {
      keyWord: this.keyWord,
      type: this.type,
      isImperative: this.isImperative,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    };
    this.profileStaffService.getListProfileStaff(dataRequest).subscribe(
      (res: any) => {
        this.listProfileStaff = res.data.data;
        this.collectionSize = res.data?.totalItems;
        this.isLoading = false;

      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err)
      }
    );
  }

  createProfileStaff() {
    const modalRef = this.modalService.open(ProfileFormStaffComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('profile.createProfileCategory'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: '',
      nameForm: 'create',
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
        if (_result == true) this.getListProfileStaff();
      },
      (_reason) => {
      }
    );
  }

  updateProfileStaff(item) {
    const modalRef = this.modalService.open(ProfileFormStaffComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('profile.editProfileCategory'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: item,
      nameForm: 'update',
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
        if (_result == true) this.getListProfileStaff();
      },
      (_reason) => {
      }
    );
  }

  removeProfileStaff(id: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: translate('profile.deleteProfileCategory'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: {id: id},
        service: this.profileStaffService,
        apiSubmit: (dataInput: any) =>
          this.profileStaffService.deleteProfileStaff(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'file-category',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getListProfileStaff();
      },
      (reason) => {
      }
    );
  }

  changeIsActive() {
    this.oldPageIndex = this.pageIndex;
    this.getListProfileStaff();
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListProfileStaff();
  }
}
