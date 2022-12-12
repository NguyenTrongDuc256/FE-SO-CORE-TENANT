import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {
  AVATAR_DEFAULT, MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
  REGEX_PHONE,
  REGEX_USER_NAME, TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import * as moment from "moment";
import { ResizeImageService } from "../../../../../_services/resize-image.service";
import { StudentStaffService } from "../../../../../_services/layout-staff/student/student-staff.service";
import { GeneralService } from "../../../../../_services/general.service";
import { ParentService } from "../../../../../_services/layout-staff/parent/parent.service";
import { ShowMessageService } from "../../../../../_services/show-message.service";
import { ListenFirebaseService } from "../../../../../_services/listen-firebase.service";
import { LocationService } from "../../../../../_services/location.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscriber } from "rxjs";
import { ParentEdit } from "../../../../../_models/layout-staff/user/parent.model";
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
  selector: 'app-parent-edit-staff',
  templateUrl: './parent-edit-staff.component.html',
  styleUrls: ['./parent-edit-staff.component.scss']
})
export class ParentEditStaffComponent implements OnInit {
  isLoading: boolean = false;
  infoForm!: FormGroup;
  avatarUser: string = AVATAR_DEFAULT;
  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;
  gender = GENDER_PARENT;
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  parentId: string;
  studentDataRelate: any;
  maxDate: string = moment().subtract(1, 'days').format('X'); // có hiển thị giờ phút hay không
  validationMessages = {
    'fullName': [
      { type: 'required', message: 'parent.validators.fullName.required' },
      { type: 'maxlength', message: 'parent.validators.fullName.maxLength' },
    ],
    // 'code': [
    //   { type: 'required', message: 'parent.validators.code.required' },
    //   { type: 'pattern', message: 'parent.validators.code.pattern' },
    //   { type: 'maxlength', message: 'parent.validators.code.maxlength' },
    // ],
    // 'username': [
    //   { type: 'required', message: 'parent.validators.username.required' },
    //   { type: 'maxlength', message: 'parent.validators.username.maxLength' },
    //   { type: 'pattern', message: 'parent.validators.username.pattern' },
    // ],
    'password': [
      { type: 'required', message: 'requiredPassword' },
      { type: 'minlength', message: 'minLengthPassword' },
      { type: 'maxlength', message: 'maxLengthPassword' },
      { type: 'pattern', message: 'patternPasswordBasic' },
    ],
    'email': [
      { type: 'email', message: 'parent.validators.email.pattern' },
    ],
    'phone': [
      { type: 'pattern', message: 'parent.validators.phone.pattern' },
    ],
    'studentsUserId': [
      { type: 'required', message: 'parent.validators.students.required' },
    ],
  }

  validationMessagesServer = {
    fullName: {},
    // code: {},
    // username: {},
    password: {},
    email: {},
    phone: {},
    studentsUserId: {},
  }

  isSubmitForm: boolean = false;

  constructor(
    private resizeImageService: ResizeImageService,
    private studentService: StudentStaffService,
    private generalService: GeneralService,
    private parentService: ParentService,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private locationService: LocationService,
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe((res: any) => {
      if (res.id) {
        this.parentId = res.id;
        this.getDataParent(res.id);
      }
      else {
        this.router.navigate(['/staff/parent']);
      }
    });
    this.getStudentDataRelate();
  }

  initForm(info) {
    this.infoForm = this.fb.group({
      avatar: [info.avatar],
      fullName: [info.name, [Validators.required, Validators.maxLength(255)]],
      gender: [info.gender],
      code: [info.code, [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      birthday: [String(info.birthday)],//không có formcontrollname bên html, lấy từ hàm datepicker
      isAccessApp: info.isAccessApp === 1 ? true : false,
      isActive: info.isActive === 1 ? true : false,
      username: [info.username, [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      email: [info.email, [Validators.email]],
      phone: [info.phone, [Validators.pattern(REGEX_PHONE)]],
      studentsUserId: [info.childrens.map(i => i.studentUserId), Validators.required],
    });
  }

  getDataParent(itemId) {
    this.isLoading = true;
    this.parentService.show(itemId).subscribe((res: any) => {
      this.avatarUser = res.data.avatar ? res.data.avatar : this.avatarUser;
      this.initForm(res.data);
      this.isLoading = false;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err);
      this.router.navigate(['/staff/parent']);
      this.isLoading = false;
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
        this.isLoading = true;
        this.generalService.uploadFileBase64(dataInput).subscribe((res: any) => {
          this.isLoading = false;
          this.infoForm.controls["avatar"].setValue(res.data);// học sinh
        }, (_err: any) => {
          this.isLoading = false;
          this.generalService.showToastMessageError400(_err);
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
    this.studentService.getStudentList(1000000, 1, '', '', '', '', '').subscribe((res: any) => {
      this.studentDataRelate = res.data.data;
      this.isLoading = false;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err);
      this.isLoading = false;
    });
  }

  onSubmit(formValue: any): void {
    this.isLoading = true;
    if (this.infoForm.valid) {
      this.saveForm(formValue);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.infoForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        })
      }
    });
  }

  validateAllFormFieldsErrorServer(error: any) {
    Object.keys(error).forEach(key => {
      let arrKey = String(key).split('.');
      let indexKey = '';
      if (arrKey.length == 1) {
        this.validationMessagesServer[arrKey[0]] = {
          message: error[key]
        }
      } else {
        arrKey.forEach((itemKey: any) => {
          if (!isNaN(itemKey)) {
            indexKey += `${itemKey}`;
          }
          Object.keys(this.validationMessagesServer).forEach(itemMessage => {
            if (itemMessage == arrKey[arrKey.length - 1]) {
              if (indexKey) {
                this.validationMessagesServer[itemMessage][indexKey] = {
                  message: error[key]
                }
              }
            }
          });
        })
      }
    });
  }

  saveForm(formValue: any) {
    const dataInput: ParentEdit = {
      studentsUserId: formValue.value.studentsUserId,
      fullName: formValue.value.fullName,
      relation: formValue.value.gender,
      email: formValue.value.email,
      phone: formValue.value.phone,
      birthday: formValue.value.birthday,
      note: '',
      avatar: formValue.value.avatar,
      gender: formValue.value.gender,
      isActive: formValue.value.isActive ? 1 : 0,
      isAccessApp: formValue.value.isAccessApp ? 1 : 0
    }


    this.listenFireBase('update', 'parent');
    this.parentService.update(dataInput, this.parentId).subscribe((res: any) => {
    }, (_err: any) => {
      this.isLoading = false;
      if (_err.status == 400) {
        this.validateAllFormFieldsErrorServer(_err.errors);
      }
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

  clickCancel() {
    this.router.navigate(['/staff/parent']);
  }

}
