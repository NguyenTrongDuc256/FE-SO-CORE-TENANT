import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Course } from 'src/app/_models/layout-staff/training/course.model';
import { User } from 'src/app/_models/user.model';
import { GeneralService } from 'src/app/_services/general.service';
import { AssignTeacherService } from 'src/app/_services/layout-staff/assign-teacher/assign-teacher.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-assign-course-teacher',
  templateUrl: './assign-course-teacher.component.html',
  styleUrls: ['./assign-course-teacher.component.scss']
})
export class AssignCourseTeacherComponent implements OnInit {

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
  arrSubjects = localStorage.getItem('dataConfigSystem')
  ? JSON.parse(localStorage.getItem('dataConfigSystem')).subjects
  : [];
  subjectId = '';
  arrUsers: Array<Teacher> = [];
  dataConvert;
  isLoading = false;
  assignmentStatus = assignmentStatus;
  arrGroupClasses = []; // nhóm lớp theo môn
  arrConvertDataUsers = [];

  constructor(
    private assignTeacherService: AssignTeacherService,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.arrGrades = this.arrGrades.filter(
      (item) =>
        item.isActive == 1 && item.educationalStages == this.educationalStage
    );
    this.arrSubjects = this.arrSubjects.filter(
      (item) =>
        item.isActive == 1 && item.educationalStages.includes(this.educationalStage)
    );
    this.getFirstData();
  }

  // nhóm cụm lớp bộ môn theo môn
  groupDataByKey(data) {
    const hash = Object.create(null),
    result = [];
    data.forEach((el, index) => {
        if (!hash[el.subjectId]) {
          hash[el.subjectId] = [];
          result.push({
            subjectId: el.subjectId,
            subjectName: el.subjectName,
            arrClass: hash[el.subjectId]
          });
        };
        hash[el.subjectId].push({...el});
    });
    let arr = result.map((item, index) => {return {...item, group: index}})
    return arr;
  }

  // convert data giáo viên: gồm thông tin giáo viên và danh sách tất cả lớp cùng trạng thái được phân công vào lớp hay không (đã được phân công thì isChecked = true và ngược lại)
  convertDataUser(arrClasses: Array<Class>, arrUser: Array<Teacher>) {
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

  // map data theo data lớp đã nhóm theo môn.
  mapDataTable() {
    this.arrClasses = this.arrClasses.map(item => {
      return {...item, subjectName: this.arrSubjects.find(su => su.id == item.subjectId
        )?.name}
    })
    this.arrGroupClasses = this.groupDataByKey(this.arrClasses);
    // tạo group để fill màu cho cột lớp trong bảng
    for (let index = 0; index < this.arrGroupClasses.length; index++) {
      this.arrGroupClasses[index] = {
        ...this.arrGroupClasses[index],
        arrClass: this.arrGroupClasses[index].arrClass.map(item => {return {...item, group: this.arrGroupClasses[index].group}})
      }
    }
    let arrClass = [];
    this.arrGroupClasses.forEach(item => {
      arrClass.push(...item.arrClass)
    })
    this.arrConvertDataUsers = this.convertDataUser(arrClass, this.arrUsers);
  }

  getFirstData() {
    this.isLoading = true;
    this.assignTeacherService.getListCourseToAssign(this.gradeId, this.subjectId).subscribe((res: any) => {
      this.arrClasses = res.data;
      this.assignTeacherService.getListCourseTeachersToAssign(this.isAssigned, this.keyword).subscribe((res: any) => {
        this.arrUsers = res.data;
        this.mapDataTable();
        this.isLoading = false;
      }, err =>  {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      })
    }, err =>  {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    })
  }

  getListUsers() {
    this.isLoading = true;
    this.assignTeacherService.getListCourseTeachersToAssign(this.isAssigned, this.keyword).subscribe((res: any) => {
      this.arrUsers = res.data;
      this.mapDataTable();
      this.isLoading = false;
    }, err =>  {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    })
  }

  getListCourse() {
    this.isLoading = true;
    this.assignTeacherService.getListCourseToAssign(this.gradeId, this.subjectId).subscribe((res: any) => {
      this.arrClasses = res.data;
      this.mapDataTable();
      this.isLoading = false;
    }, err =>  {
      this.isLoading = false;
      this.generalService.showToastMessageError400(err);
    })
  }

  submit(event, valueRow, indexRow: number, indexTd: number) {
    this.arrConvertDataUsers[indexRow].arrClasses[indexTd].isChecked = event;
    let output = {
      teacherId: this.arrConvertDataUsers[indexRow].userId,
      classId: this.arrConvertDataUsers[indexRow].arrClasses[indexTd].id,
      isAssign: +this.arrConvertDataUsers[indexRow].arrClasses[indexTd].isChecked,
    };
    this.isLoading = true;
    this.listenFireBase('course-teacher', 'assignment');
    this.assignTeacherService
      .assignCourseTeacher(output)
      .subscribe((res: any) => {},
      (err: any) => {
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
    this.getListCourse();
  }

  filterAssign() {
    this.getListUsers();
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

export interface Class extends Course {
  id: string;
  gradeId: string;
  homeroomTeacherId: string;
  name: string;
  code: string;
}

enum assignmentStatus {ALL_STATUS = 0, ASSIGNED = 1, UNASSIGNED = 2 }
