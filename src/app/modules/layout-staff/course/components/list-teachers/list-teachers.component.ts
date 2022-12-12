import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { User } from 'src/app/_models/user.model';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT
} from 'src/app/_shared/utils/constant';
import { AssignTeacherCourseComponent } from '../../modals/assign-teacher/assign-teacher.component';

@Component({
  selector: 'app-list-teachers-homeroom-class',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.scss', '../../helper.scss'],
})
export class ListTeachersHomeroomClassComponent implements OnInit {
  keyword = '';
  arrList: User[] = [];
  isLoading = false;
  permission = DATA_PERMISSION;
  avatarDefault = AVATAR_DEFAULT;
  classId: string;
  infoCourse: any;
  arrGrades = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades : [];

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
      this.getDetailCourse();
    });
  }

  getList() {
    this.isLoading = true;
    this.trainingService
      .getListTeacherCourse(
        this.classId,
        this.keyword
      )
      .subscribe(
        (res: any) => {
          this.arrList = res.data;
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  getDetailCourse() {
    this.isLoading = true;
    this.trainingService.getDetailCourse(this.classId).subscribe((res: any) => {
      this.isLoading = false;
      this.infoCourse = res.data;
    }, err => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    })
  }

  create() {
    this.isLoading = true;
    let gradeName = this.arrGrades.find(it => it.id == this.infoCourse?.gradeId)?.name || '--';
    this.trainingService
      .getListTeacherToAssignCourse(
        this.classId,
        PAGE_INDEX_DEFAULT,
        PAGE_SIZE_DEFAULT,
        ''
      )
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          const modalRef = this.modalService.open(
            AssignTeacherCourseComponent,
            {
              scrollable: true,
              windowClass: 'myCustomModalClass',
              keyboard: false,
              backdrop: 'static', // prevent click outside modal to close modal
              centered: false, // vị trí hiển thị modal ở giữa màn hình
              size: 'xl', // 'sm' | 'md' | 'lg' | 'xl',
            }
          );

          let data = {
            titleModal: 'training.assignTeacher',
            btnCancel: 'btnAction.cancel',
            btnAccept: 'btnAction.save',
            isHiddenBtnClose: false, // hidden/show btn close modal
            dataFromParent: {
              listUsers: res.data?.data || [],
              collectionSize: res.data?.totalItems || 0,
              schoolYear: '',
              infoClass: {
                id: this.classId,
                name: this.infoCourse?.name,
                code: this.infoCourse?.code,
                gradeName: gradeName,
              },
              service: this.trainingService,
              apiSubmit: (dataInput: any) =>
                this.trainingService.assignTeacherCourse(dataInput),
              keyFirebaseAction: 'teacher',
              keyFirebaseModule: 'course/enroll',
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
      titleModal: 'training.titleDialogRemoveTeacher',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        role: id,
        dataInput: { classId: this.classId, userId: id },
        service: this.trainingService,
        apiSubmit: (dataInput: any) =>
          this.trainingService.removeTeacherCourse(dataInput),
        keyFirebaseAction: 'move-teacher',
        keyFirebaseModule: 'course/enroll',
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
}
