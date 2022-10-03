import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  AVATAR_DEFAULT, MESSAGE_ERROR_CALL_API,
  REGEX_CODE, REGEX_EMAIL,
  REGEX_PHONE, REGEX_USER_NAME,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {ResizeImageService} from "src/app/_services/resize-image.service";
import {StudentService} from "src/app/_services/layout-tenant/student/student.service";
import {GeneralService} from "src/app/_services/general.service";
import {ParentService} from "src/app/_services/layout-tenant/parent/parent.service";
import {ShowMessageService} from "src/app/_services/show-message.service";
import {ListenFirebaseService} from "src/app/_services/listen-firebase.service";
import {LocationService} from "src/app/_services/location.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscriber} from "rxjs";
import * as moment from "moment";
import {ParentEdit} from "src/app/_models/layout-tenant/user/parent.model";
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
  selector: 'app-parent-edit-tenant',
  templateUrl: './parent-edit-tenant.component.html',
  styleUrls: ['./parent-edit-tenant.component.scss']
})
export class ParentEditTenantComponent implements OnInit {
  isLoading: boolean = false;
  infoForm!: FormGroup;
  avatarUser: string = AVATAR_DEFAULT;
  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;
  gender = GENDER_PARENT;
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  parentId: string;
  studentDataRelate: any;
  maxDate: string = moment().subtract(1, 'days').format('X'); // có hiển thị giờ phút hay không
  validation_messages = {
    'fullName': [
      { type: 'required', message: 'parent.validators.fullName.required'},
      { type: 'maxlength', message: 'parent.validators.fullName.maxLength'},
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
  isSubmitForm: boolean = false;

  constructor(
    private resizeImageService: ResizeImageService,
    private studentService: StudentService,
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
        this.router.navigate(['/tenant/parent']);
      }
    });
    this.getStudentDataRelate();
  }

  // initForm() {
  //   this.infoForm = this.fb.group({
  //     avatar: [],
  //     fullName: ['', [Validators.required, Validators.maxLength(255)]],
  //     gender: [],
  //     code: ['', [Validators.required, Validators.pattern(REGEX_CODE)]],
  //     birthday: [],//không có formcontrollname bên html, lấy từ hàm datepicker
  //     isAccessApp: false,
  //     isActive: false,
  //     username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
  //     email: ['', [Validators.pattern(REGEX_EMAIL)]],
  //     phone: ['', [Validators.pattern(REGEX_PHONE)]],
  //     childrens: [[], Validators.required],
  //   });
  // }

  initForm(info) {
    this.infoForm = this.fb.group({
      avatar: [info.avatar],
      fullName: [info.name, [Validators.required, Validators.maxLength(255)]],
      gender: [info.gender],
      code: [info.code, [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)]],
      birthday: [String(info.birthday)],//không có formcontrollname bên html, lấy từ hàm datepicker
      isAccessApp: info.isAccessApp === 1 ? true : false,
      isActive: info.isActive === 1 ? true : false,
      username: [info.username, [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      email: [info.email, [Validators.pattern(REGEX_EMAIL)]],
      phone: [info.phone, [Validators.pattern(REGEX_PHONE)]],
      childrens: [info.childrens.map(i => i.studentUserId), Validators.required],
    });
  }

  getDataParent(itemId){
    this.isLoading = true;
    setTimeout(() => {
      if (this.isLoading) {
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
        this.isLoading = false;
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    this.parentService.show(itemId).subscribe((res: any) => {
      if (res.status === 1) {
        this.avatarUser = res.data.avatar ? res.data.avatar : this.avatarUser;
        this.initForm(res.data);

        // this.infoForm.get('birthday').setValue(String(res.data.birthday))
        //
        // this.infoForm.patchValue({
        //   avatar: res.data.code,
        //   fullName: res.data.name,
        //   username: res.data.username,
        //   gender: res.data.gender,
        //   code: res.data.code,
        //   isAccessApp: res.data.isAccessApp === 1 ? true : false,
        //   isActive: res.data.isActive === 1 ? true : false,
        //   email: res.data.email,
        //   phone: res.data.phone,
        //   childrens: res.data.childrens.map(i => i.studentId),
        // })
        this.isLoading = false;
      }

      if (res.status === 0) {
        this.isLoading = false;
        this.router.navigate(['/tenant/parent']);
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.router.navigate(['/tenant/parent']);
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
        this.generalService.uploadFileBase64(dataInput).subscribe((res: any) => {
          this.infoForm.controls["avatar"].setValue(res.data);// học sinh
          console.log('hs');
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
    this.studentService.getStudentList(1000000, 1,'', '', '', '' ,'').subscribe((res: any) => {
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
    const dataInput: ParentEdit = {
      studentsUserId: formValue.value.childrens,
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
      if (res.status == 0 && res.status != undefined) {
        this.isLoading = false;
        this.isSubmitForm = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
      this.isSubmitForm = false;
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
        this.router.navigate(['/tenant/parent']);
      } else {
        this.isLoading = false;
      }
    });
  }

  clickCancel(){
    this.router.navigate(['/tenant/parent']);
  }

}
