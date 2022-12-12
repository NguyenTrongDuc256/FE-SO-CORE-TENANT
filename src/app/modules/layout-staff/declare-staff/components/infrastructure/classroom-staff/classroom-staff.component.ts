import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {translate} from '@ngneat/transloco';
import {Building, ClassroomList} from 'src/app/_models/layout-staff/declare/infrastructure/Classroom.model';
import {infrastructureService} from 'src/app/_services/layout-staff/declare/infrastructure.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {ModalDeleteComponent} from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT,
} from 'src/app/_shared/utils/constant';
import {
  ModalClassroomFormStaffComponent
} from '../../../modals/infrastructure/modal-classroom-form-staff/modal-classroom-form-staff.component';
import {GeneralService} from "../../../../../../_services/general.service";

@Component({
  selector: 'app-classroom-staff',
  templateUrl: './classroom-staff.component.html',
  styleUrls: ['./classroom-staff.component.scss'],
})
export class ClassroomStaffComponent implements OnInit {
  permission = DATA_PERMISSION;
  listClassroom: ClassroomList[];
  isLoading = false;
  keyWord: string = '';
  isRoomType: number | string = '';
  IsActive: number | string = '';
  NumberOfFloor: number | string = '';
  sizeOption = PAGE_SIZE_OPTIONS_DEFAULT;
  pageIndex = PAGE_INDEX_DEFAULT;
  pageSize = PAGE_SIZE_DEFAULT;
  collectionSize = 0;
  oldPageIndex = this.pageIndex;
  buildingFilter: Building[];

  constructor(
    private infrastructureService: infrastructureService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.getListClassStaff();
  }

  getBuildingStaff(item = null) {
    this.isLoading = true;
    this.infrastructureService.getBuildingStaff().subscribe(
      (res: any) => {

        const listBuilding = res.data;
        this.buildingFilter = listBuilding.filter((el) => el.IsActive > 0);
        if (item) {
          this.updateClassroom(item);
        } else {
          this.createClassroom();
        }

        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err)
      }
    );
  }

  getListClassStaff() {
    this.isLoading = true;
    let dataRequest = {
      keyWord: this.keyWord,
      isRoomType: this.isRoomType,
      IsActive: this.IsActive,
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
    };

    this.infrastructureService.getListClassStaff(dataRequest).subscribe(
      (res: any) => {

          this.listClassroom = res.data.data;
          this.collectionSize = res.data?.totalItems;

        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err)
      }
    );
  }

  changeIsActie() {
    this.oldPageIndex = this.pageIndex;
    this.getListClassStaff();
  }

  createClassroom() {
    const modalRef = this.modalService.open(ModalClassroomFormStaffComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('infrastructure.createClassroom'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: '',
      buildingFilter: this.buildingFilter,
      nameForm: 'create',
      isDisabledSelect: false
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
        if (_result) {
          this.getListClassStaff();
        }
      },
      (_reason) => {
      }
    );
  }

  updateClassroom(item) {
    const modalRef = this.modalService.open(ModalClassroomFormStaffComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      backdrop: 'static',
      centered: false,
      size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
    });
    let data = {
      titleModal: translate('infrastructure.updateClassroom'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: item,
      buildingFilter: this.buildingFilter,
      nameForm: 'update',
      isDisabledSelect: true
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
        if (_result) {
          this.getListClassStaff();
        }
      },
      (_reason) => {
      }
    );
  }

  removeClassroom(id: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      modalDialogClass: 'modal-md-plus',
    });
    let data = {
      titleModal: translate('infrastructure.deleteClassroom'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.save'),
      isHiddenBtnClose: true,
      dataFromParent: {
        dataInput: {id: id},
        service: this.infrastructureService,
        apiSubmit: (dataInput: any) =>
          this.infrastructureService.deleteClassStaff(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'classroom',
      },
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result == true) this.getListClassStaff();
      },
      (reason) => {
      }
    );
  }

  paginationChange(event: any) {
    this.oldPageIndex = this.pageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getListClassStaff();
  }
}
