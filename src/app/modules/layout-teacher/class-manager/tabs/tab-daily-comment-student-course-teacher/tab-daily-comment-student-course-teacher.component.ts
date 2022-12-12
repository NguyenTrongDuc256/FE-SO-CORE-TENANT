import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DailyCommentStaffService } from 'src/app/_services/layout-staff/daily-comment/daily-comment-staff.service';
import { ModalGuideDailyCommentComponent } from 'src/app/modules/layout-staff/homeroom-class/modals/modal-guide-daily-comment/modal-guide-daily-comment.component';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { DailyComment } from 'src/app/_models/layout-staff/daily-comment/daily-comment.model';

@Component({
  selector: 'app-tab-daily-comment-student-course-teacher',
  templateUrl: './tab-daily-comment-student-course-teacher.component.html',
  styleUrls: ['./tab-daily-comment-student-course-teacher.component.scss']
})
export class TabDailyCommentStudentCourseTeacherComponent implements OnInit {
  isLoading: boolean = false;
  // data cần truyền lên
  currentDateSentNotification: string = ''; // ngày truyền lên
  currentDateFilter: string = moment().format('X');
  timePicker: boolean = true; // có hiển thị giờ phút hay không
  minDate: string = moment().format('X'); // Có thể truyền hoặc không
  // maxDate:string = "1653706178"; // Có thể truyền hoặc không
  checkIsQuickDailyComment: boolean = false;
  contentQuickDailyComment: string = '';
  fileAttachQuickDailyComment: string = '';
  dataCommentStudent = [];
  dataQuickCommentStudent = [];
  dataFileStudent = [];
  dataQuickFileStudent = [];
  dataCheckQuickComment = [];
  checkAll: boolean = false;
  fileNameGeneral: string = '';
  fileUrlGeneral: string = '';
  dataSource: DailyComment;
  courseId: string = '';
  keyWord: string = '';
  statusNotification: boolean = false;
  constructor(
    private generalService: GeneralService,
    private listenFirebaseService: ListenFirebaseService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private dailyCommentStaffService: DailyCommentStaffService,
    private showMessageService: ShowMessageService
  ) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.params.id;
  }

  getDataDailyComment() {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.dailyCommentStaffService.getInitializationDataCourse(this.courseId, this.currentDateFilter, this.keyWord).subscribe((res: any) => {
      this.dataSource = res.data;
      if (res.data.sendNotificationStatus) {
        this.statusNotification = true;
        this.currentDateSentNotification = res.data.sendNotificationAt;
      }
      this.convertDataComment();
      this.isLoading = false;
    }, (_err) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    })
  }

  convertDataComment() {
    this.dataSource.students.forEach(element => {
      this.dataCommentStudent[element.id] = element.comment;
      this.dataCheckQuickComment[element.id] = false;
      this.dataFileStudent[element.id] = element.fileAttach;
    });
  }

  // lay data khi chon ngày xong
  dataTimeOutputSentNotificationAt(event: any) {
    this.currentDateSentNotification = event;
  }

  dataTimeOutputFilter(event: any) {
    this.currentDateFilter = event;
    this.getDataDailyComment();
  }

  openFormQuickDailyComment() {
    this.checkIsQuickDailyComment = !this.checkIsQuickDailyComment;
  }

  checkedItem(event, id: string) {
    this.dataCheckQuickComment[id] = event;
    this.dataCommentStudent[id] = this.contentQuickDailyComment;
  }

  checkedAllItem(event) {
    this.checkAll = event;
    if (event) {
      for (const key in this.dataCheckQuickComment) {
        this.dataCheckQuickComment[key] = true;
      }
    } else {
      for (const key in this.dataCheckQuickComment) {
        this.dataCheckQuickComment[key] = false;
      }
    }
  }

  changeContentQuickComment(event) {
    this.contentQuickDailyComment = event.target.value;
    for (const key in this.dataCheckQuickComment) {
      if (this.dataCheckQuickComment[key]) {
        this.dataQuickCommentStudent[key] = this.contentQuickDailyComment;
      }
    }
  }

  getGenderName(value) {
    if (value == 1) {
      return "genderName.male";
    } else if (value == 2) {
      return "genderName.female";
    } else {
      return "genderName.other";
    }
  }

  getNameStatusSendNotifiaction(value) {
    if (value == 1) {
      return "dailyComment.statusSentNotification1";
    } else {
      return "dailyComment.statusSentNotification0";
    }
  }

  onChangeFileInput(event) {
    if (event.target.files.length > 0) {
      this.isLoading = true;
      const file = event.target.files[0];
      this.fileNameGeneral = file.name;
      this.generalService.postFile(file).subscribe((res: any) => {
        this.fileUrlGeneral = res.default;
        for (const key in this.dataCheckQuickComment) {
          if (this.dataCheckQuickComment[key]) {
            this.dataQuickFileStudent[key] = this.fileUrlGeneral;
          }
        }
        this.isLoading = false;
      })
    }
  }

  onChangeSingleFile(event: any, id: string) {
    if (event.target.files.length > 0) {
      this.isLoading = true;
      const file = event.target.files[0];
      this.generalService.postFile(file).subscribe((res: any) => {
        this.dataFileStudent[id] = res.default;
        this.isLoading = false;
      })
    }
  }

  convertFileName(name: string) {
    if (name) {
      let arrSplit = name.split('/');
      return arrSplit[arrSplit.length - 1];
    } else {
      return '';
    }
  }

  saveFormDailyComment() {
    this.isLoading = true;
    let dataComment = [];
    this.dataSource.students.forEach(element => {
      dataComment.push({
        userId: element.id,
        comment: this.dataCheckQuickComment[element.id] ? this.dataQuickCommentStudent[element.id] : this.dataCommentStudent[element.id],
        fileAttach: this.dataCheckQuickComment[element.id] ? this.dataQuickFileStudent[element.id] : this.dataFileStudent[element.id]
      })
    });
    let dataInput = {
      date: Number(this.currentDateFilter),
      sendNotificationAt: Number(this.currentDateSentNotification),
      data: dataComment
    }
    this.listenFireBase("save", "course-comment");
    this.saveDataDailyComment(dataInput);
  }

  saveDataDailyComment(dataInput) {
    this.dailyCommentStaffService.saveDailyCommentDataCourse(this.courseId, dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.showMessageService.error(res.msg);
      }
      this.isLoading = false;
    }, (_err) => {
      this.isLoading = false;
    })
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }

  opendGuideComment() {
    const modalRef = this.modalService.open(ModalGuideDailyCommentComponent,
      {
        scrollable: true,
        windowClass: 'myCustomModalClass',
        keyboard: false,
        centered: false, // vị trí hiển thị modal ở giữa màn hình
        size: 'lg', // 'sm' | 'md' | 'lg' | 'xl',
      });

    let data = {
      titleModal: 'Modal thêm',
      btnCancel: 'Hủy',
      btnAccept: 'Thêm',
      isHiddenBtnClose: true, // hidden/show btn close modal
      dataFromParent: 'Nội dung modal',
    }

    modalRef.componentInstance.dataModal = data;
    modalRef.result.then((result) => { }, (reason) => {
    });
  }

}
