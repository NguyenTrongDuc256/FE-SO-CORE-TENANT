import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { StudentInCourse } from 'src/app/_models/layout-staff/training/course.model';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ModalDeleteComponent } from 'src/app/_shared/modals/modal-delete/modal-delete.component';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  GENDER,
  PAGE_INDEX_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTIONS_DEFAULT
} from 'src/app/_shared/utils/constant';
import { AssignStudentCourseComponent } from '../../modals/assign-student/assign-student.component';

@Component({
  selector: 'app-list-students-course',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss', '../../helper.scss'],
})
export class ListStudentsCourseComponent implements OnInit {
  keyword = '';
  arrList: StudentInCourse[] = [];
  isLoading = false;
  permission = DATA_PERMISSION;
  avatarDefault = AVATAR_DEFAULT;
  classId: string;
  className = '';
  classCode = '';
  arrGender = GENDER;
  pageSizeDefault = PAGE_SIZE_DEFAULT;
  pageIndexDefault = PAGE_INDEX_DEFAULT;
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
      this.getInfoBasicCourse();
    });
  }

  getList() {
    this.isLoading = true;
    this.trainingService
      .getListStudentCourse(
        this.classId,
        this.keyword
      )
      .subscribe(
        (res: any) => {
          this.arrList = res.data;
          this.arrList.forEach(
            (item) =>
              (item['genderName'] =
                this.arrGender.find((i) => i.id == item.gender)?.name || '--')
          );
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(err);
        }
      );
  }

  getInfoBasicCourse() {
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
      .getListStudentToAssignCourse(
        this.classId,
        this.pageIndexDefault,
        this.pageSizeDefault
      )
      .subscribe(
        (res: any) => {
          this.isLoading = false;
          const modalRef = this.modalService.open(
            AssignStudentCourseComponent,
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
            titleModal: 'training.titleDialogAssignStudent',
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
                this.trainingService.assignStudentCourse(dataInput),
              keyFirebaseAction: 'student',
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
      titleModal: 'training.titleDialogRemoveStudent',
      btnCancel: 'btnAction.cancel',
      btnAccept: 'btnAction.delete',
      isHiddenBtnClose: false, // hidden/show btn close modal
      dataFromParent: {
        dataInput: { classId: this.classId, userId: id },
        service: this.trainingService,
        apiSubmit: (dataInput: any) =>
          this.trainingService.removeStudentCourse(dataInput),
        keyFirebaseAction: 'move-student',
        keyFirebaseModule: 'course/enroll',
        textConfirmHeader:
          translate('training.textConfirmRemoveStudent1') +
          ' ' +
          name +
          ' ' +
          translate('training.textConfirmRemoveStudent2'),
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
