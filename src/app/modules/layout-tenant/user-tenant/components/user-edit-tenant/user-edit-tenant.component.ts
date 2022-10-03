import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {translate} from '@ngneat/transloco';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ResizeImageService} from "src/app/_services/resize-image.service";
import * as moment from 'moment';
import {GeneralService} from "src/app/_services/general.service";
import {Observable, Subscriber} from "rxjs";
import {
  AVATAR_DEFAULT,
  GENDER,
  MAX_LENGTH_FULL_NAME,
  MESSAGE_ERROR_CALL_API,
  REGEX_PHONE,
  TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {RoleService} from "src/app/_services/layout-tenant/role/role.service";
import {ShowMessageService} from "src/app/_services/show-message.service";
import {ListenFirebaseService} from "src/app/_services/listen-firebase.service";
import {UserService} from "src/app/_services/layout-tenant/user/user.service";
import {UserEdit} from "src/app/_models/layout-tenant/user/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Role} from "src/app/_models/layout-tenant/role/role.model";
import {ValidateUser} from "src/app/_models/layout-tenant/user/validate.model";

@Component({
  selector: 'app-user-edit-tenant',
  templateUrl: './user-edit-tenant.component.html',
  styleUrls: ['./user-edit-tenant.component.scss']
})
export class UserEditTenantComponent implements OnInit {
  isLoading: boolean = false;
  formGroup: FormGroup;
  avatarUser: string = AVATAR_DEFAULT;
  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;

  userId: string = '';
  gender: any = GENDER;
  roleList: Role[] = [];
  currentDate = null; // ngày truyền lên
  timePicker: boolean = false; // có hiển thị giờ phút hay không
  isSubmitForm: boolean = false;
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
    private activeRouter: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((res: any) => {
      if (res.id) {
        this.userId = res.id;
        this.getUserDetail(res.id);
      }
    });
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

  initForm(userInfo): void {
    this.formGroup = this.fb.group({
      avatar: [userInfo.avatar],
      fullName: [userInfo.fullname, [
        Validators.required,
        Validators.maxLength(MAX_LENGTH_FULL_NAME),
      ]],
      code: [userInfo.code, []],
      username: [userInfo.username, []],
      gender: [userInfo.gender],
      birthday: [userInfo.birthday],
      email: [userInfo.email, [
        Validators.email
      ]],
      phone: [userInfo.phone, [
        Validators.pattern(REGEX_PHONE)
      ]],
      isActive: [!!userInfo.isActive],
      isAccessApp: [!!userInfo.isAccessApp],
    });
  }

  onSubmit(formValue): void {
    this.isLoading = true;
    this.isSubmitForm = true;
    let dataInput: UserEdit = {
      userId: this.userId,
      avatar: formValue.value.avatar,
      fullName: formValue.value.fullName,
      gender: Number(formValue.value.gender),
      birthday: formValue.value.birthday,
      email: formValue.value.email,
      phone: formValue.value.phone,
      isActive: formValue.value.isActive ? Number(formValue.value.isActive) : 0,
      isAccessApp: formValue.value.isAccessApp ? Number(formValue.value.isAccessApp) : 0,
    }

    this.listenFireBase("update", "user");
    this.userService.update(dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.isLoading = false;
        this.isSubmitForm = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isSubmitForm = false;
      this.isLoading = false;
    })
  }

  listenFireBase(action: string, module: string): void {
    setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
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

  getUserDetail(id: string) {
    this.isLoading = true;
    this.userService
      .show(id)
      .subscribe(
        (res: any) => {
          if (res.status == 1 && res.status != undefined) {
            this.currentDate = res.data?.birthday;
            this.avatarUser = res.data?.avatar;
            this.initForm(res.data);
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
}
