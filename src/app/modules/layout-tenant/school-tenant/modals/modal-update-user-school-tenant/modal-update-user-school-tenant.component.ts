import {translate} from '@ngneat/transloco';
import {Observable, Subscriber} from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {ListenFirebaseService} from 'src/app/_services/listen-firebase.service';
import {AVATAR_DEFAULT, TIME_OUT_LISTEN_FIREBASE, REGEX_PHONE, GENDER} from 'src/app/_shared/utils/constant';
import {ResizeImageService} from 'src/app/_services/resize-image.service';
import * as moment from 'moment';
import {GeneralService} from 'src/app/_services/general.service';
import {ValidatorNotEmptyString} from 'src/app/_services/validator-custom.service';

@Component({
  selector: 'app-modal-update-user-school-tenant',
  templateUrl: './modal-update-user-school-tenant.component.html',
  styleUrls: ['./modal-update-user-school-tenant.component.scss', '../../helper.scss']
})
export class ModalUpdateUserSchoolTenantComponent implements OnInit {

  @Input() dataModal: any;
  formUser: FormGroup;
  dataFromParent: any;
  isLoading = false;
  avatarUser: string = AVATAR_DEFAULT;
  fileName: string = '';
  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;
  currentDate = null; // ngày truyền lên
  arrGender = GENDER;
  maxDate = moment().format('X');
  isLoadingUploadImg = false;
  validationMessages = {
    fullName: [
      {
        type: "required",
        message: 'requiredName'
      },
      {
        type: "notEmpty",
        message: 'requiredName'
      },
      {
        type: "maxlength",
        message: 'maxLengthName'
      },
    ],
    phone: [
      {
        type: "pattern",
        message: 'school.patternPhone'
      },
    ],
    email: [
      {
        type: "email",
        message: 'school.patternEmail'
      },
    ],
  };
  validationMessagesServer = {
    fullName: {},
    phone: {},
    email: {},
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private resizeImageService: ResizeImageService,
    private generalService: GeneralService
  ) {
  }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.avatarUser = this.dataFromParent.user.avatar && this.dataFromParent.user.avatar != '' ? this.dataFromParent.user.avatar : AVATAR_DEFAULT;
    this.initForm();
    this.currentDate = this.dataFromParent?.user?.birthday;
  }

  initForm() {
    this.formUser = this.fb.group({
      fullName: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.user?.fullname
          : '',
        [Validators.maxLength(255), ValidatorNotEmptyString, Validators.required],
      ],
      phone: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.user?.phone
          : '',
        [Validators.pattern(REGEX_PHONE)],
      ],
      email: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.user?.email
          : '',
        [Validators.email]
      ],
      gender: this.dataFromParent.nameForm == 'update'
        ? this.dataFromParent?.user?.gender
        : 1,
      birthday: this.dataFromParent.nameForm == 'update'
        ? this.dataFromParent?.user?.birthday
        : '',
      status: this.dataFromParent.nameForm == 'update'
        ? Boolean(this.dataFromParent?.user?.isActive)
        : true,
    });
  }


  submit(valueForm: any) {
    this.isLoading = true;
    if (this.formUser.valid) {
      this.update(valueForm);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formUser);
    }
  }

  update(valueForm) {
    let dataInput = {
      userId: this.dataFromParent?.user?.id,
      avatar: this.avatarUser,
      fullName: valueForm.fullName,
      gender: Number(valueForm.gender),
      birthday: valueForm.birthday,
      email: valueForm.email,
      phone: valueForm.phone,
      isActive: Number(valueForm.status)
    };
    this.listenFireBase(this.dataFromParent.keyFirebaseAction, this.dataFromParent.keyFirebaseModule);
    this.dataFromParent
      .apiSubmit(dataInput)
      .subscribe(
        (res: any) => {
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
          this.validateAllFormFieldsErrorServer(err.errors);
        }
      );
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
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

  getExtension(image) {
    if (image.endsWith('jpg')) {
      return 'jpg';
    }
    if (image.endsWith('jpeg')) {
      return 'jpeg';
    }
    if (image.endsWith('png')) {
      return 'png';
    }
  }

  onChangeFileInputAvatar(event: any): void {
    this.isLoadingUploadImg = true;
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      let allowExtensionImage = ['png', 'jpg', 'jpeg'];
      if (!allowExtensionImage.includes(this.getExtension(file?.type))) {
        this.showMessage.warning(translate('msgCheckImg'));
        this.isLoadingUploadImg = false;
        return;
      }
      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      })
      dataReadFile.subscribe((data) => {
        let dataInput = {
          base64Input: data as string,
          fileName: `${moment().format('x')}-${file.name}`
        }
        this.generalService.uploadFileBase64(dataInput).subscribe((res: any) => {
          this.avatarUser = res.data;
          this.isLoadingUploadImg = false;
        })
      })
    } else this.isLoadingUploadImg = false;
  }

  onDeleteFileInputAvatar(): void {
    this.fileInputAvatar.nativeElement.value = '';
    this.avatarUser = AVATAR_DEFAULT;
  }

  dataTimeOutput(event: any): void {
    this.formUser.get('birthday').patchValue(event);
    this.currentDate = event;
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
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
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }
}
