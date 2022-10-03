import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {translate} from '@ngneat/transloco';
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {ResizeImageService} from "src/app/_services/resize-image.service";
import * as moment from 'moment';
import {GeneralService} from "src/app/_services/general.service";
import {Observable, Subscriber} from "rxjs";
import {
  AVATAR_DEFAULT,
  GENDER,
  MAX_LENGTH_CODE,
  MAX_LENGTH_FULL_NAME, MAX_LENGTH_PASSWORD,
  MAX_LENGTH_USERNAME,
  MESSAGE_ERROR_CALL_API,
  MIN_LENGTH_PASSWORD,
  REGEX_CODE,
  REGEX_PASSWORD,
  REGEX_PHONE,
  REGEX_USER_NAME,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {RoleService} from "src/app/_services/layout-tenant/role/role.service";
import {ShowMessageService} from "src/app/_services/show-message.service";
import {Role} from "src/app/_models/layout-tenant/role/role.model";
import {ListenFirebaseService} from "src/app/_services/listen-firebase.service";
import {UserService} from "src/app/_services/layout-tenant/user/user.service";
import {CampusList, SchoolList, UserStore} from "src/app/_models/layout-tenant/user/user.model";
import {Router} from "@angular/router";
import {ValidateUser} from "src/app/_models/layout-tenant/user/validate.model";

@Component({
  selector: 'app-user-create-tenant',
  templateUrl: './user-create-tenant.component.html',
  styleUrls: ['./user-create-tenant.component.scss']
})
export class UserCreateTenantComponent implements OnInit {
  isLoading: boolean = false;
  formGroup: FormGroup;
  avatarUser: string = AVATAR_DEFAULT;
  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;

  gender: any = GENDER;
  roleList: Role[] = [];
  schoolList: SchoolList[] = [];
  campusList: CampusList[] = [];

  currentDate = null; // ngày truyền lên
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  isSubmitForm: boolean = false;
  arrLayoutSwitchSchool: string[] = ['staff', 'teacher', 'student'];
  arrLayoutSwitchCampus: string[] = ['campus'];
  isSelectCampus: boolean = false;
  isSelect: boolean = false;
  isShowPassword = false;

  validationMessages: ValidateUser = {
    fullName: [
      {
        type: "required",
        message: 'user.validators.fullName.required',
      },
      {
        type: "maxlength",
        message: 'user.validators.fullName.maxlength',
      }
    ],
    code: [
      {
        type: "required",
        message: 'user.validators.code.required',
      },
      {
        type: "pattern",
        message: 'user.validators.code.pattern',
      },
      {
        type: "maxlength",
        message: 'user.validators.code.maxlength',
      }
    ],
    username: [
      {
        type: "required",
        message: 'user.validators.username.required',
      },
      {
        type: "pattern",
        message: 'user.validators.username.pattern',
      },
      {
        type: "maxlength",
        message: 'user.validators.username.maxlength',
      }
    ],
    password: [
      {
        type: "required",
        message: 'user.validators.password.required',
      },
      {
        type: "pattern",
        message: 'user.validators.password.pattern',
      },
      {
        type: "maxlength",
        message: 'user.validators.password.maxlength',
      },
      {
        type: "minlength",
        message: 'user.validators.password.minlength',
      }
    ],
    email: [
      {
        type: "email",
        message: 'user.validators.email.email',
      }
    ],
    phone: [
      {
        type: "pattern",
        message: 'user.validators.phone.pattern',
      }
    ],
    roleId: [

    ],
    schoolId: [
      {
        type: "required",
        message: 'user.validators.schoolId.required',
      }
    ],
    campusId: [
      {
        type: "required",
        message: 'user.validators.campusId.required',
      }
    ]
  };

  constructor(
    private resizeImageService: ResizeImageService,
    private roleService: RoleService,
    private generalService: GeneralService,
    private showMessageService: ShowMessageService,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getRoleList();
    this.getSchoolList();
    this.getCampusList();
    this.initForm();
  }

  showPassword() {
    this.isShowPassword = !this.isShowPassword;
  }

  dataTimeOutput(event: any): void {
    this.formGroup.get('birthday').patchValue(event);
  }

  onChangeFileInputAvatar(event: any): void {
    if (event.target.files.length > 0) {
      this.isSubmitForm = true;
      this.isLoading = true;
      const file = (event.target as HTMLInputElement).files[0];
      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      })
      dataReadFile.subscribe((data) => {
        this.avatarUser = data as string;
        let dataInput = {
          base64Input: data,
          fileName: `${moment().format('x')}-${file.name}`
        }
        this.generalService.uploadFileBase64(dataInput).subscribe((res: any) => {
          this.formGroup.controls["avatar"].setValue(res.data);
          this.isSubmitForm = false;
          this.isLoading = false;
        })
      })
    }
  }

  onDeleteFileInputAvatar(): void {
    this.fileInputAvatar.nativeElement.value = '';
    this.avatarUser = AVATAR_DEFAULT;
    this.formGroup.controls["avatar"].setValue(this.avatarUser);
  }

  initForm(): void {
    this.formGroup = this.fb.group({
      avatar: [this.avatarUser],
      fullName: ['', [
        Validators.required,
        Validators.maxLength(MAX_LENGTH_FULL_NAME),
      ]],
      code: ['', [
        Validators.required,
        Validators.pattern(REGEX_CODE),
        Validators.maxLength(MAX_LENGTH_CODE),
      ]],
      username: ['', [
        Validators.required,
        Validators.pattern(REGEX_USER_NAME),
        Validators.maxLength(MAX_LENGTH_USERNAME),
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(REGEX_PASSWORD),
        Validators.minLength(MIN_LENGTH_PASSWORD),
        Validators.maxLength(MAX_LENGTH_PASSWORD),
      ]],
      gender: [1],
      birthday: [''],
      email: ['', [
        Validators.email
      ]],
      phone: ['', [
        Validators.pattern(REGEX_PHONE)
      ]],
      isActive: [1],
      isAccessApp: [1],
      roleId: ['', [

      ]],
      campusId: ['', [

      ]],
      schoolId: ['', [

      ]],
    })
  }

  onSubmit(formValue): void {
    this.isLoading = true;
    this.isSubmitForm = true;
    let dataInput: UserStore = {
      avatar: formValue.value.avatar,
      fullName: formValue.value.fullName,
      code: formValue.value.code,
      username: formValue.value.username,
      password: formValue.value.password,
      gender: Number(formValue.value.gender),
      birthday: formValue.value.birthday ? Number(formValue.value.birthday) : null,
      email: formValue.value.email,
      phone: formValue.value.phone,
      isActive: formValue.value.isActive ? Number(formValue.value.isActive) : 0,
      isAccessApp: formValue.value.isAccessApp ? Number(formValue.value.isAccessApp) : 0,
      roleId: formValue.value.roleId ? formValue.value.roleId : null,
      campusId: formValue.value.campusId ? formValue.value.campusId : null,
      schoolId: formValue.value.schoolId ? formValue.value.schoolId : null,
    }

    this.listenFireBase("create", "user");
    this.userService.store(dataInput).subscribe((res: any) => {
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
        this.router.navigate(['/tenant/user']);
      } else {
        this.isLoading = false;
      }
    });
  }

  getRoleList(): void {
    this.isLoading = true;
    this.userService.getDataRolesToAssign().subscribe((res: any) => {
        if (res.status == 1 && res.status != undefined) {
          this.roleList = res.data;
        } else {
          this.showMessageService.error(res.msg);
        }
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  getSchoolList(): void {
    this.isLoading = true;
    this.userService.getSchoolList().subscribe((res: any): void => {
        if (res.status == 1) {
          this.schoolList = res.data;
        } else {
          this.showMessageService.error(res.msg);
        }
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  getCampusList(): void {
    this.isLoading = true;
    this.userService.getCampusList().subscribe((res: any): void => {
        if (res.status == 1) {
          this.campusList = res.data;
        } else {
          this.showMessageService.error(res.msg);
        }
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
      }
    );
  }

  onChangeRole(event): void {
    let roleDetail = this.roleList.find(el => el.id == event.target.value);
    if (roleDetail !== undefined && this.arrLayoutSwitchSchool.includes(roleDetail.layout)) {
      this.isSelect = true;
      this.isSelectCampus = false;
      this.formGroup.controls["schoolId"].setValidators([Validators.required]);
      this.formGroup.get('schoolId').patchValue('');
      this.formGroup.get('schoolId').updateValueAndValidity();

      this.formGroup.get('campusId').clearValidators();
      this.formGroup.get('campusId').patchValue('');
      this.formGroup.get('campusId').updateValueAndValidity();

    } else if (roleDetail !== undefined && this.arrLayoutSwitchCampus.includes(roleDetail.layout)) {
      this.isSelect = true;
      this.isSelectCampus = true;
      this.formGroup.controls["campusId"].setValidators([Validators.required]);
      this.formGroup.get('campusId').patchValue('');
      this.formGroup.get('campusId').updateValueAndValidity();

      this.formGroup.get('schoolId').clearValidators();
      this.formGroup.get('schoolId').patchValue('');
      this.formGroup.get('schoolId').updateValueAndValidity();

    } else {
      this.isSelect = false;
      this.isSelectCampus = false;
      this.formGroup.get('schoolId').clearValidators();
      this.formGroup.get('schoolId').patchValue('');
      this.formGroup.get('schoolId').updateValueAndValidity();

      this.formGroup.get('campusId').clearValidators();
      this.formGroup.get('campusId').patchValue('');
      this.formGroup.get('campusId').updateValueAndValidity();
    }
  }
}
