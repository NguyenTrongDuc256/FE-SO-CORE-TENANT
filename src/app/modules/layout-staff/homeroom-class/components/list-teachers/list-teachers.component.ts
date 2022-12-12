import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION
} from 'src/app/_shared/utils/constant';
import { AssignTeacherHomeroomClassComponent } from '../../modals/assign-teacher/assign-teacher.component';

@Component({
  selector: 'app-list-teachers-homeroom-class',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.scss', '../../helper.scss'],
})
export class ListTeachersHomeroomClassComponent implements OnInit {
  keyword = '';
  arrList = [];
  isLoading = false;
  permission = DATA_PERMISSION;
  avatarDefault = AVATAR_DEFAULT;
  classId: string;
  infoBasicClass: {
    id: string;
    name: string;
    code: string;
    gradeId: string;
    gradeName?: string;
  };
  arrGrades = localStorage.getItem('dataConfigSystem')
    ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades
    : [];

  constructor(
    private modalService: NgbModal,
    private trainingService: TrainingService,
    private activatedRouter: ActivatedRoute,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((par) => {
      this.classId = par.id;
      this.getList();
      this.getInfoBasic();
    });
  }

  getList() {
    this.isLoading = true;
    this.trainingService
      .getListTeacherHomeroomClass(
        this.classId,
        this.keyword
      )
      .subscribe(
        (res: any) => {
          this.arrList = res.data;
          this.arrList.sort((a,b) => b.type-a.type);
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  getInfoBasic() {
    this.trainingService.getInfoBasicHomeroomClass(this.classId).subscribe(
      (res: any) => {
        this.infoBasicClass = res.data;
        this.infoBasicClass['gradeName'] =
          this.arrGrades.find(
            (grade) => grade.id == this.infoBasicClass.gradeId
          )?.name || '--';
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
  }

  create() {
    const modalRef = this.modalService.open(
      AssignTeacherHomeroomClassComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static', // prevent click outside modal to close modal
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
      }
    );

    let data = {
      titleModal: 'training.addTeacherToHomeroomClass',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.save',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        arrList: [],
        classId: this.classId,
        infoClass: {
          id: this.classId,
          name: this.infoBasicClass?.name,
          code: this.infoBasicClass?.code,
          gradeId: this.infoBasicClass?.gradeId,
          gradeName: this.infoBasicClass?.gradeName,
        },
        service: this.trainingService,
        apiSubmit: (id: string, dataInput: any) =>
          this.trainingService.assignTeacherHomeroomClass(id, dataInput),
        keyFirebaseAction: 'create',
        keyFirebaseModule: 'homeroom_class_teacher',
        nameForm: 'create',
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getList();
        }
      },
      (reason) => {}
    );
  }

  remove(userId: string, name: string) {
    const modalRef = this.modalService.open(ModalDeleteComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false, // vị trí hiển thị modal ở giữa màn hình
      modalDialogClass: 'modal-md-plus',
    });

    let data = {
      titleModal: 'training.titleDialogRemoveTeacher',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: { classId: this.classId, teacherId: userId},
        service: this.trainingService,
        apiSubmit: (dataInput: any) =>
          this.trainingService.removeTeacherHomeroomClass(dataInput),
        keyFirebaseAction: 'delete',
        keyFirebaseModule: 'homeroom_class_teacher',
        textConfirmHeader:
          translate('training.textConfirmRemoveTeacher1') +
          ' ' +
          name +
          ' ' +
          translate('training.textConfirmRemoveTeacher2'),
      },
    };

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (result: boolean) => {
        if (result) {
          this.getList();
        }
      },
      (reason) => {}
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
    this.keyword = value.trim();
    this.getList();
  }

  paginationChange(event: any) {
    this.getList();
  }
}
