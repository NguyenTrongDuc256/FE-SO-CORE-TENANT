import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  AVATAR_DEFAULT, MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
  REGEX_EMAIL,
  REGEX_PASSWORD, REGEX_PHONE,
  REGEX_USER_NAME, TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import * as moment from "moment";
import {StudentList} from "../../../../../_models/layout-staff/student/student.model";
import {ResizeImageService} from "../../../../../_services/resize-image.service";
import {StudentStaffService} from "../../../../../_services/layout-staff/student/student-staff.service";
import {GeneralService} from "../../../../../_services/general.service";
import {ParentService} from "../../../../../_services/layout-staff/parent/parent.service";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {LocationService} from "../../../../../_services/location.service";
import {Router} from "@angular/router";
import {Observable, Subscriber} from "rxjs";
import {ParentStore} from "../../../../../_models/layout-staff/user/parent.model";
export const GENDER_PARENT = [
  {
    id: 1,
    name: 'genderName.male',
  },
  {
    id: 2,
    name: 'genderName.female',
  },
]
@Component({
  selector: 'app-parent-create-staff',
  templateUrl: './parent-create-staff.component.html',
  styleUrls: ['./parent-create-staff.component.scss']
})
export class ParentCreateStaffComponent implements OnInit {
  isLoading: boolean = false;
  infoForm!: FormGroup;
  avatarUser: string = AVATAR_DEFAULT;

  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;
  gender = GENDER_PARENT;
  currentDate = "1653706178"; // Date picker ngày truyền lên
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  maxDate: string = moment().subtract(1, 'days').format('X'); // có hiển thị giờ phút hay không


  studentDataRelate: StudentList[];
  validation_messages = {
    'fullName': [
      { type: 'required', message: 'parent.validators.fullName.required'},
      { type: 'maxlength', message: 'parent.validators.fullName.maxLength'}
    ],
    'code': [
      { type: 'required', message: 'parent.validators.code.required'},
      { type: 'pattern', message: 'parent.validators.code.pattern'},
      { type: 'maxlength', message: 'parent.validators.code.maxlength'},
    ],
    'username': [
      { type: 'required', message: 'parent.validators.username.required'},
      { type: 'minlength', message: 'parent.validators.username.minLength'},
      { type: 'maxlength', message: 'parent.validators.username.maxLength'},
      { type: 'pattern', message: 'parent.validators.username.pattern'},
    ],
    'password': [
      { type: 'required', message: 'requiredPassword'},
      { type: 'minlength', message: 'minLengthPassword'},
      { type: 'maxlength', message: 'maxLengthPassword'},
      { type: 'pattern', message: 'patternPasswordBasic'},
    ],
    'email': [
      { type: 'pattern', message: 'parent.validators.email.pattern'},
    ],
    'phone': [
      { type: 'pattern', message: 'parent.validators.phone.pattern'},
    ],
  }
  constructor(
    private resizeImageService: ResizeImageService,
    private studentStaffService: StudentStaffService,
    private generalService: GeneralService,
    private parentService: ParentService,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private locationService: LocationService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.getStudentDataRelate();
    this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      avatar: [],
      fullName: ['', [Validators.required, Validators.maxLength(255)]],
      gender: 1,
      code: ['', [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      birthday: [],//không có formcontrollname bên html, lấy từ hàm datepicker
      isAccessApp: false,
      isActive: true,
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_PASSWORD)]],
      email: ['', [Validators.pattern(REGEX_EMAIL)]],
      phone: ['', [Validators.pattern(REGEX_PHONE)]],
      childrens: [[], Validators.required],
    });
  }

  onChangeFileInputAvatar(event): void {//inputFor//học sinh-1, bố ruột-2, mẹ đẻ-3, người đỡ đầu-4
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      })
      dataReadFile.subscribe((data) => {
        // this.avatarUser = data as string;
        this.avatarUser = data as string;
        let dataInput = {
          base64Input: data,
          fileName: `${moment().format('x')}-${file.name}`
        }
        this.generalService.uploadFileBase64(dataInput).subscribe((res: any) => {
          this.infoForm.controls["avatar"].setValue(res.data);// học sinh
        })
      })
    }
  }

  onDeleteFileInputAvatar(): void {
    this.fileInputAvatar.nativeElement.value = '';
    this.avatarUser = AVATAR_DEFAULT;
    this.infoForm.controls["avatar"].setValue(this.avatarUser);// học sinh
  }

  dataTimeBirthday(event: any) {//lấy ngày sinh date picker
    this.infoForm.get('birthday').setValue(Number(event));
  }

  getStudentDataRelate() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const school = JSON.parse(localStorage.getItem('currentUnit')).id
    this.studentStaffService.getStudentList(100000, 1,school, '', '', '' ,'').subscribe((res: any) => {
      if (res.status === 1) {
        this.studentDataRelate = res.data.data;
        this.isLoading = false;
      }

      if (res.status === 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    });
  }

  onSubmit(formValue): void {
    this.isLoading = true;
    // formValue.
    const dataInput: ParentStore = {
      studentsUserId: formValue.value.childrens,
      relation: formValue.value.gender,
      code: formValue.value.code,
      fullName: formValue.value.fullName,
      username: formValue.value.username,
      password: formValue.value.password,
      email: formValue.value.email,
      phone: formValue.value.phone,
      birthday: formValue.value.birthday,
      note: '',
      avatar: formValue.value.avatar,
      gender: formValue.value.gender,
      isActive: formValue.value.isActive ? 1 : 0,
      isAccessApp: formValue.value.isAccessApp ? 1 : 0
    }
    this.listenFireBase('create', 'parent');
    this.parentService.store(dataInput).subscribe((res: any) => {
      if (res.status == 0 && res.status != undefined) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading === true) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>): void => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.router.navigate(['/staff/parent']);
      } else {
        this.isLoading = false;
      }
    });
  }

  clickCancel(){
    this.router.navigate(['/tenant/parent']);
  }

}
