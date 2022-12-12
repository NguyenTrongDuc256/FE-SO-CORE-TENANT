import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HomeroomClass } from 'src/app/_models/layout-staff/training/homeroom-class.model';
import { User } from 'src/app/_models/user.model';
import { GeneralService } from 'src/app/_services/general.service';
import { AssignTeacherService } from 'src/app/_services/layout-staff/assign-teacher/assign-teacher.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-assign-homeroom-teacher',
  templateUrl: './assign-homeroom-teacher.component.html',
  styleUrls: ['./assign-homeroom-teacher.component.scss', '../../helper.scss'],
})
export class AssignHomeroomTeacherComponent implements OnInit {
  arrGrades = localStorage.getItem('dataConfigSystem')
    ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades
    : [];
  educationalStage = localStorage.getItem('currentUnit')
    ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages
    : null;
  gradeId = '';
  keyword = '';
  isAssigned = assignmentStatus.ALL_STATUS;
  arrClasses: Array<Class> = [];
  arrUsers: Array<Teacher> = [];
  dataConvert;
  isLoading = false;
  assignmentStatus = assignmentStatus;

  constructor(
    private assignTeacherService: AssignTeacherService,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.arrGrades = this.arrGrades.filter(
      (item) =>
        item.isActive == 1 && item.educationalStages == this.educationalStage
    );
    this.getFirstData();
  }

  convertData(arrClasses: Array<Class>, arrUser: Array<Teacher>) {
    let arrClassesConvert = arrClasses.map((object) => {
      return { ...object, isChecked: false };
    });
    let arr = [];
    arrUser.forEach((user: Teacher) => {
      arr.push({
        userId: user.id,
        userName: user.name,
        code: user.code,
        phone: user.phone,
        email: user.email,
        arrClasses: arrClassesConvert.map((item) => {
          return { ...item, isChecked: user.classIds.includes(item.id) };
        }),
      });
    });
    return arr;
  }

  getFirstData() {
    this.isLoading = true;
    this.assignTeacherService
      .getListHomeroomClassesToAssign(this.gradeId)
      .subscribe((res: any) => {
        this.arrClasses = res.data;
        this.getListUsers();
      }, (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      });
  }

  getListHomeroomClasses() {
    this.isLoading = true;
    this.assignTeacherService
      .getListHomeroomClassesToAssign(this.gradeId)
      .subscribe((res: any) => {
        this.arrClasses = res.data;
        this.dataConvert = this.convertData(this.arrClasses, this.arrUsers);
        this.isLoading = false;
      }, (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      });
  }

  getListUsers() {
    this.isLoading = true;
    this.assignTeacherService
      .getListHomeroomTeachersToAssign(this.isAssigned, this.keyword)
      .subscribe((res: any) => {
        this.arrUsers = res.data;
        this.dataConvert = this.convertData(this.arrClasses, this.arrUsers);
        this.isLoading = false;
      }, (err) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      });
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
    this.getListUsers();
  }

  filter() {
    this.getListHomeroomClasses();
  }

  filterAssign() {
    this.getListUsers();
  }

  submit(event, valueRow, indexRow: number, indexTd: number) {
    this.dataConvert[indexRow].arrClasses[indexTd].isChecked = event;
    let output = {
      teacherId: this.dataConvert[indexRow].userId,
      classId: this.dataConvert[indexRow].arrClasses[indexTd].id,
      isAssign: +this.dataConvert[indexRow].arrClasses[indexTd].isChecked,
    };
    this.isLoading = true;
    this.listenFireBase('homeroom-class-teacher', 'assignment');
    this.assignTeacherService
      .assignHomeroomTeacher(output)
      .subscribe((res: any) => {},
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      });
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
}

export interface Teacher extends User {
  id: string;
  classIds: Array<string>;
}

export interface Class extends HomeroomClass {
  id: string;
  gradeId: string;
  homeroomTeacherId: string;
  name: string;
  code: string;
}

enum assignmentStatus {ALL_STATUS = 0, ASSIGNED = 1, UNASSIGNED = 2 }
