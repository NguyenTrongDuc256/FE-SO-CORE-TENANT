import {Component, Input, OnInit} from '@angular/core';
import {
  AVATAR_DEFAULT,
  DATA_PERMISSION,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import * as moment from "moment/moment";
import {forkJoin, Observable, Subscriber} from "rxjs";
import {
  ConfigHomeroomClassAttendance,
  DataStudentAttendance,
  SaveHomeroomClassAttendance,
  StudentAndDataAttendance
} from "src/app/_models/layout-staff/training/attendance-staff.model";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {
  AttendanceTeacherService
} from "../../../../../_services/layout-teacher/class-manager/attendance-teacher.service";
import {GeneralService} from "../../../../../_services/general.service";

@Component({
  selector: 'app-tab-attendance-teacher',
  templateUrl: './tab-attendance-teacher.component.html',
  styleUrls: ['./tab-attendance-teacher.component.scss']
})
export class TabAttendanceTeacherComponent implements OnInit {
  permission = DATA_PERMISSION;
  isLoading: boolean = false;
  isSubmit: boolean = false;
  timePicker: boolean = false;
  configAttendance: ConfigHomeroomClassAttendance;
  studentAndDataAttendance: StudentAndDataAttendance;
  attendanceDate: string = moment(moment().format('YYYY-MM-DD')).format("X");
  maxDate: string = moment(moment().format('YYYY-MM-DD')).format("X");
  checkAttendanceDate: number = Number(this.attendanceDate);
  @Input() homeroomClassId: string;
  keyWord: string = '';
  formGroup: FormGroup;
  avatar: string = AVATAR_DEFAULT;
  numberAttendanceByStatus: any[] = [];

  constructor(
    private showMessageService: ShowMessageService,
    private attendanceTeacherService: AttendanceTeacherService,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    const APIGetConfigAttendance = this.attendanceTeacherService.getConfigAttendance();
    const APIGetStudentAndDataAttendanceList = this.attendanceTeacherService.getStudentAndDataAttendanceList(this.homeroomClassId, this.attendanceDate, this.keyWord);
    forkJoin([APIGetConfigAttendance, APIGetStudentAndDataAttendanceList]).subscribe((res: any) => {
      this.configAttendance = res[0].data;
      this.studentAndDataAttendance = res[1].data;
      if (this.configAttendance && this.studentAndDataAttendance) {
        this.handleNumberAttendanceByStatus()
        this.initForm();
        if (this.studentAndDataAttendance.students && this.studentAndDataAttendance.students.length > 0) {
          this.studentAndDataAttendance.students.forEach(dataStudent => {
            this.addStudentToFormArray(dataStudent);
          });
        }
      }
      this.isLoading = false;

      }, err => {
      this.generalService.showToastMessageError400(err);
      this.isLoading = false;
      }
    );
  }

  get students() {
    return this.formGroup.get('students') as FormArray;
  }

  initForm() {
    this.formGroup = this.fb.group({
      id: this.studentAndDataAttendance.id,
      date: Number(this.attendanceDate),
      students: this.fb.array([])
    })
  }

  addStudentToFormArray(data: any): void {
    const itemForm = this.fb.group({
      id: [data.id],
      avatarHanet: [data.avatarHanet],
      avatar: [data.avatar],
      name: [data.name],
      code: [data.code],
      gender: [data.gender],
      status: [(data.status || data.status == 0) ? data.status : this.configAttendance.defaultAttendanceStatus],
      attendanceBy: [data.attendanceBy],
      attendanceTime: [data.attendanceTime],
      note: [data.note],
      mealNote: [data.mealNote],
      attachedFiles: [data.attachedFiles],
      isDisplay: true,
    })

    this.students.push(itemForm);
  }

  getStudentAndDataAttendanceList(): void {
    this.isLoading = true;
    const timeoutCallAPI = setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);

    this.attendanceTeacherService.getStudentAndDataAttendanceList(this.homeroomClassId, this.attendanceDate, this.keyWord).subscribe(
      (res: any) => {
      clearTimeout(timeoutCallAPI);
      this.studentAndDataAttendance = res.data;
      this.handleNumberAttendanceByStatus();
      this.isLoading = false;

    }, (_err: any) => {
      clearTimeout(timeoutCallAPI);
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  dataTimeOutputDate(event: any): void {
    if (this.attendanceDate != event) {
      this.attendanceDate = event;
      this.formGroup.get('date').patchValue(this.attendanceDate);
      this.getStudentAndDataAttendanceList();
    }
  }

  onSubmit(formValue): void {
    this.isLoading = true
    let dataStudentAttendance: DataStudentAttendance[] = [];
    if (formValue.students.length > 0) {
      formValue.students.forEach(el => {
        dataStudentAttendance.push({
          id: el.id,
          status: Number(el.status),
          note: el.note,
          mealNote: el.mealNote,
        });
      });
    }

    let dataInput: SaveHomeroomClassAttendance = {
      id: formValue.id,
      date: formValue.date,
      student: dataStudentAttendance,
    }

    this.listenFireBase("save", "homeroom-class-attendance");
    this.attendanceTeacherService.saveDataAttendance(dataInput).subscribe((res: any) => {
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.getStudentAndDataAttendanceList();
        this.isLoading = false;
      } else {
        this.isLoading = false;
      }
    });
  }

  handleNumberAttendanceByStatus() {
    if (this.configAttendance?.attendanceConfigurations?.length > 0 && this.studentAndDataAttendance?.students?.length > 0) {
      this.numberAttendanceByStatus = [];
      this.configAttendance.attendanceConfigurations.forEach(item => {
        this.numberAttendanceByStatus.push({
          code: item.code,
          name: item.name,
          total: this.studentAndDataAttendance.students.filter(el => el.status == item.code).length,
          color: 'color: #50A5F1',
        });
      });
    }
  }

  search(valueSearch): void {
    if (valueSearch && this.students.value.length > 0) {
      valueSearch = valueSearch.trim().toLowerCase();
      this.students.value.forEach((item, index) => {
        if (item.name.toLowerCase().includes(valueSearch) || item.code.toLowerCase().includes(valueSearch)) {
          (this.students.at(index) as FormGroup).get('isDisplay').patchValue(true);
        } else {
          (this.students.at(index) as FormGroup).get('isDisplay').patchValue(false);
        }
      })
    } else {
      if (this.students.value.length > 0) {
        this.students.value.forEach((item, index) => {
          (this.students.at(index) as FormGroup).get('isDisplay').patchValue(true);
        })
      }
    }
  }
}
