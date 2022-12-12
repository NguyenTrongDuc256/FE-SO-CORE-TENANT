import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { User } from 'src/app/_models/user.model';
import { GeneralService } from 'src/app/_services/general.service';
import { AssignTeacherService } from 'src/app/_services/layout-staff/assign-teacher/assign-teacher.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-assign-grade-master',
  templateUrl: './assign-grade-master.component.html',
  styleUrls: ['./assign-grade-master.component.scss']
})
export class AssignGradeMasterComponent implements OnInit {

  arrGrades = localStorage.getItem('dataConfigSystem')
    ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades
    : [];
  educationalStage = localStorage.getItem('currentUnit')
    ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages
    : null;
  gradeId = '';
  keyword = '';
  arrUsers: Array<Teacher> = [];
  dataConvert;
  isLoading = false;

  constructor(
    private assignTeacherService: AssignTeacherService,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.arrGrades = this.arrGrades.filter(
      (item) =>
        item.isActive == 1 && item.educationalStages == this.educationalStage
    );
    this.getListUsers();
  }

  convertData(arrGrades: Array<Grade>, arrUser: Array<Teacher>) {
    let arrGradesConvert = arrGrades.map((object) => {
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
        arrGrades: arrGradesConvert.map((item) => {
          return { ...item, isChecked: user.gradeIds.includes(item.id) };
        }),
      });
    });
    return arr;
  }

  getListUsers() {
    this.isLoading = true;
    this.assignTeacherService
      .getListTeachersToAssignGradeMaster(this.keyword)
      .subscribe((res: any) => {
        this.arrUsers = res.data;
        this.dataConvert = this.convertData(this.arrGrades, this.arrUsers);
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

  submit(event, valueRow, indexRow: number, indexTd: number) {
    this.dataConvert[indexRow].arrGrades[indexTd].isChecked = event;
    let output = {
      userId: this.dataConvert[indexRow].userId,
      gradeId: this.dataConvert[indexRow].arrGrades[indexTd].id,
      isAssign: +this.dataConvert[indexRow].arrGrades[indexTd].isChecked,
    };
    this.isLoading = true;
    this.listenFireBase('grade-master', 'assignment');
    this.assignTeacherService
      .assignGradeMaster(output)
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
  gradeIds: Array<string>;
}

export interface Grade {
  id: string;
  name: string;
  code: string;
  educationalStages: number
  indexOrder: number
  isActive: number
  tenantId: string
}
