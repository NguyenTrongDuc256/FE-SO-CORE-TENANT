import { Observable, Subscriber } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { AVATAR_DEFAULT, TIME_OUT_LISTEN_FIREBASE, REGEX_PHONE, GENDER } from 'src/app/_shared/utils/constant';
import { ResizeImageService } from 'src/app/_services/resize-image.service';
import * as moment from 'moment';
import { GeneralService } from 'src/app/_services/general.service';

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

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private resizeImageService: ResizeImageService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.avatarUser = this.dataFromParent.user.avatar && this.dataFromParent.user.avatar != '' ? this.dataFromParent.user.avatar : AVATAR_DEFAULT;
    this.initForm();
  }

  initForm() {
    this.formUser = this.fb.group({
      name: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.user?.fullname
          : '',
        [Validators.required, Validators.maxLength(250)],
      ],
      username: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.user?.username
          : '',
        [Validators.required],
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


  submit(valueForm: any, isContinue: boolean) {
    this.isLoading = true;
    let dataInput = {
      userId: this.dataFromParent?.user?.id,
      avatar: this.avatarUser,
      fullName: valueForm.name,
      gender: Number(valueForm.gender),
      birthday: valueForm.birthday,
      email: valueForm.email,
      phone: valueForm.phone,
      isActive: Number(valueForm.status)
    };
    this.listenFireBase(this.dataFromParent.keyFirebaseAction, this.dataFromParent.keyFirebaseModule, isContinue);
    this.dataFromParent
      .apiSubmit(dataInput)
      .subscribe(
        (res: any) => {
          if (res.status == 0) {
            this.showMessage.error(res.msg);
          }
          this.isLoading = false;
        },
        (err: any) => {
          this.isLoading = false;
        }
      );
  }

  onChangeFileInputAvatar(event: any): void {
    if (event.target.files.length > 0) {
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
          // this.formGroup.controls["avatar"].setValue(res.data);
          // this.isSubmitForm = false
        })
      })
    }
  }

  onDeleteFileInputAvatar(): void {
    this.fileInputAvatar.nativeElement.value = '';
    this.avatarUser = AVATAR_DEFAULT;
    // this.formGroup.controls["avatar"].setValue(this.avatarUser);
  }

  dataTimeOutput(event: any): void {
    this.formUser.get('birthday').patchValue(event);
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  listenFireBase(action: string, module: string, isContinue: boolean = false) {
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
        if(!isContinue) {
          this.activeModal.close(true);
        }
      } else {
        this.isLoading = false;
      }
    });
  }
}
