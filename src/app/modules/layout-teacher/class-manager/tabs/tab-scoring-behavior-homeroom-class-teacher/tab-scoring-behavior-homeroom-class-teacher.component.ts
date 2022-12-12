import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Grades, HomeroomClass, Student } from 'src/app/_models/layout-teacher/class-manager/score-behavior-teacher.model';
import { BehaviorTeacherService } from 'src/app/_services/layout-teacher/class-manager/behavior-teacher.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DATA_PERMISSION, GENDER } from 'src/app/_shared/utils/constant';
import { ModalHistoryStudentInHomeroomClassTeacherComponent } from '../../modals/modal-history-student-in-homeroom-class-teacher/modal-history-student-in-homeroom-class-teacher.component';

@Component({
  selector: 'app-tab-scoring-behavior-homeroom-class-teacher',
  templateUrl: './tab-scoring-behavior-homeroom-class-teacher.component.html',
  styleUrls: ['../../../class-manager/style.scss', './tab-scoring-behavior-homeroom-class-teacher.component.scss']
})
export class TabScoringBehaviorHomeroomClassTeacherComponent implements OnInit {

  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  keyWord: string = '';
  gradeId: string = '';
  homeroomClassId: string = '';
  gradeList: Grades[] = [];
  homeroomClassList: HomeroomClass[] = [];
  studentScoreList: Student[] = [];
  genders = GENDER;
  homeroomClassInfo: { id: string, name: string, code: string };
  nzNotFoundContent: string = 'behavior.label.notFoundContent';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private behaviorTeacherService: BehaviorTeacherService,
    private modalService: NgbModal,
    private showMessage: ShowMessageService
  ) {
  }

  ngOnInit(): void {
    this.homeroomClassId = this.activatedRoute.snapshot.params.id;
    this.getStudentByHomeroomClass();
    this.getHomeroomClassInfo();

  }

  search(value) {
    this.keyWord = value;
    this.getStudentByHomeroomClass();
  }

  // Thông tin lớp học
  getHomeroomClassInfo() {
    this.isLoading = true;
    this.behaviorTeacherService
      .getHomeroomClassInfo(this.homeroomClassId)
      .subscribe(
        (res: any) => {
          this.homeroomClassInfo = res.data;
          console.log(' this.homeroomClassInfo', this.homeroomClassInfo);
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.showMessage.error(err.msg);
        }
      );
  }

  // Danh sách học sinh trong lớp chủ nhiệm
  getStudentByHomeroomClass() {
    this.isLoading = true;
    this.behaviorTeacherService.getStudentByHomeroomClass(this.homeroomClassId, this.keyWord).subscribe((res: any) => {
      this.studentScoreList = res.data;
      console.log(' this.studentScoreList', this.studentScoreList);

      this.isLoading = false;
    },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(err.msg);
      }
    );
  }

  // Gọi modal lịch sử chấm điểm hành vi 1 học sinh
  showHistoryStudent(item) {
    const modalRef = this.modalService.open(
      ModalHistoryStudentInHomeroomClassTeacherComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        backdrop: 'static',
        centered: false,
        size: 'xl', // 'sm' | 'md' | 'lg' | 'xl' | string
      }
    );
    let data = {
      titleModal: translate('behavior.title.scoringHistory'),
      btnCancel: translate('btnAction.cancel'),
      btnAccept: translate('btnAction.confirm'),
      isHiddenBtnClose: true,
      dataFromParent: item,
      dataKeyId: this.homeroomClassId,
    };
    modalRef.componentInstance.dataModal = data;
    modalRef.result.then(
      (_result) => {
        this.getStudentByHomeroomClass();
      },
      (_reason) => {
      }
    );
  }

  routerLink() {
    this.router.navigate(['/teacher/class-manager/history-homeroom-class'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        classId: this.homeroomClassId
      },
      queryParamsHandling: 'merge',
    });
  }


}
