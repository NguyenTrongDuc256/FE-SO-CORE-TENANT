import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  AVATAR_DEFAULT,
  MESSAGE_ERROR_CALL_API,
  NOTIFICATION_RECIPIENT_GROUP,
  SCOPE_NOTIFICATION, TIME_OUT_LISTEN_FIREBASE
} from "../../../../../_shared/utils/constant";
import {
  NotificationEdit,
  RecipientGroupList,
  SendingScopeList, SendList
} from "../../../../../_models/layout-tenant/notification/notification.model";
import * as moment from "moment";
import {ResizeImageService} from "../../../../../_services/resize-image.service";
import {NotificationService} from "../../../../../_services/layout-tenant/notifiction/notification.service";
import {GeneralService} from "../../../../../_services/general.service";
import {ShowMessageService} from "../../../../../_services/show-message.service";
import {ListenFirebaseService} from "../../../../../_services/listen-firebase.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ValidatorNotEmptyString} from "../../../../../_services/validator-custom.service";
import {Observable, Subscriber} from "rxjs";
import {
  NotificationReviewContentTenantComponent
} from "../../modals/notification-review-content-tenant/notification-review-content-tenant.component";
import {translate} from "@ngneat/transloco";

@Component({
  selector: 'app-notification-edit-teacher',
  templateUrl: './notification-edit-tenant.component.html',
  styleUrls: ['./notification-edit-tenant.component.scss']
})
export class NotificationEditTenantComponent implements OnInit {
  isLoading: boolean = false;
  formGroup!: FormGroup;
  avatarUser: string = AVATAR_DEFAULT;
  dataSendingScope?: Partial<SendingScopeList>[];
  dataRecipientGroup?: Partial<RecipientGroupList>[];
  dataSendList?: Partial<SendList>[];
  @ViewChild('fileInputAvatar') fileInputAvatar: ElementRef;
  timePicker: boolean = true; // có hiển thị giờ phút hay không
  minDate: string = moment().subtract(1, 'days').format('X'); // có hiển thị giờ phút hay không
  checkedAll:boolean = false;
  checkedNumberTrue:number = 0;
  labelObject:string;
  notificationId: string;
  dataApi: any;
  validationMessages = {
    title: [
      { type: 'required', message: 'notification.validators.title.required'},
      { type: 'maxlength', message: 'notification.validators.title.maxLength'},
    ],
    recipientGroups: [
      { type: 'required', message: 'notification.validators.recipientGroups.required'},
    ],
    content: [
      { type: 'required', message: 'notification.validators.content.required'},
    ],
    sendingScope: [
      { type: 'required', message: 'notification.validators.scope.required'},
    ],
    objectIds: [
      { type: 'required', message: 'notification.validators.object.required'},
    ]
  }

  validationMessagesServer = {
    title: {},
    recipientGroups: {},
    content: {},
    sendingScope: {},
    objectIds: {},
  }


  constructor(
    private resizeImageService: ResizeImageService,
    private notificationService: NotificationService,
    private generalService: GeneralService,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private router: Router,
    private modalService: NgbModal,
    private activeRouter: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe((res: any) => {
      if (res.id) {
        this.isLoading = true
        this.notificationId = res.id;
        this.getDetailNotification();
      }
      else {
        this.router.navigate(['/tenant/notification']);
      }
    });
    // this.initForm();
  }

  getDetailNotification(){
    this.notificationService.show(this.notificationId).subscribe((res: any) => {
        const dataRecipientGroups = NOTIFICATION_RECIPIENT_GROUP;
        this.avatarUser = res.data.avatar ? res.data.avatar : this.avatarUser;
        this.dataApi = res.data;
        this.notificationService.getRecipientGroupsList(res.data.sendingScope).subscribe((ref: any) => {
            this.dataRecipientGroup = [];
            ref.data.forEach(item => {
              const dataItem = dataRecipientGroups.find(i => i.value === item);
              const check = res.data.recipientGroups.find(i => i === item);
              this.dataRecipientGroup.push({value: dataItem.value, label: dataItem.label, checked: check ? true : false})
            });
            this.checkedAll = this.dataRecipientGroup.filter(item => item.checked === false).length === 0? true : false;
            this.checkedNumberTrue = this.dataRecipientGroup.filter(item => item.checked === true).length;

            this.isLoading = false;
            this.initForm(res.data);

        }, (_err: any) => {
          this.generalService.showToastMessageError400(_err)
          this.router.navigate(['/tenant/notification']);
          this.isLoading = false;
        });
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err)
      this.router.navigate(['/tenant/notification']);
      this.isLoading = false;
    });
  }

  dataTimeOutput(event:any){
    this.formGroup.get('sendAt').setValue(Number(event));
  }

  initForm(data) {
    this.formGroup = this.fb.group({
      avatar: data.avatar,
      title: [data.title, [Validators.required, Validators.maxLength(255)]],
      description: data.description,
      content: [data.content, [Validators.required]],
      sendingScope: [ data.sendingScope, Validators.required],
      recipientGroups: this.fb.array([]),
      objectIds: [data.objects.map(item => {return item.id})],
      isAllowComment: data.isAllowComment === 1 ? true : false,
      sendNow: data.sendAt === null ? 1 : 2,
      sendAt: [data.sendAt],
      files: this.fb.array([]),
    });
    data.files.forEach(item => {
      this.getFormArrayFiles.push(this.initFormFile(item));
    });
    this.dataRecipientGroup.forEach(item => {
      this.getFormArrayRecipientGroups.push(this.initFormRecipientGroups(item));
    });

    if (this.formGroup.get('sendingScope').value !== 1){
      this.formGroup.get('objectIds').setValidators([Validators.required])
    }
    else {
      this.formGroup.get('objectIds').clearValidators()
    }

    this.getDataGeneralList()
    this.getObjectsSendList();
  }

  initFormRecipientGroups(item): FormGroup {
    return this.fb.group({
      name: [item.label],
      value: [item.value],
      checked: [item.checked],
    });
  }

  get getFormArrayRecipientGroups() {
    return this.formGroup.get('recipientGroups') as FormArray;
  }

  getDataGeneralList(){
    const dataSendingScope = SCOPE_NOTIFICATION;
    this.isLoading = true;
    this.notificationService.getSendingScopesList().subscribe((ref: any) => {
        this.dataSendingScope = [];
        ref.data.forEach(item => {
          const check = dataSendingScope.find(i => i.value === item)
          this.dataSendingScope.push(check)
        });
        this.labelObject = this.dataSendingScope.find(item => item.value === Number(this.formGroup.get('sendingScope').value)).label;
        this.isLoading = false;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err)
      this.isLoading = false;
    });
  }

  getDataRecipientGroupsList(){
    const dataRecipientGroups = NOTIFICATION_RECIPIENT_GROUP;

    this.notificationService.getRecipientGroupsList(this.formGroup.get('sendingScope').value).subscribe((ref: any) => {
        this.dataRecipientGroup = [];
        this.checkedAll = false;
        (this.formGroup.get('recipientGroups') as FormArray).clear();
        ref.data.forEach(item => {
          const check = dataRecipientGroups.find(i => i.value === item)
          this.dataRecipientGroup.push({value: check.value, label: check.label, checked: false})
        });
        this.dataRecipientGroup.forEach(item => {
          this.getFormArrayRecipientGroups.push(this.initFormRecipientGroups(item));
        });
        this.checkedNumberTrue = this.formGroup.value.recipientGroups.filter(item => item.checked === true).length;
        this.isLoading = false;
    }, (_err: any) => {
      this.generalService.showToastMessageError400(_err)
      this.isLoading = false;
    });
  }

  getObjectsSendList(){
    this.notificationService.getObjectsSendList(this.formGroup.get('sendingScope').value).subscribe((ref: any) => {
        if (this.dataApi.status === 1){
          this.dataSendList = [];
          ref.data.forEach(item => {
            if (this.formGroup.get('objectIds').value.find(i => {return i === item.id})){
              this.dataSendList.push(item)
            }
          })
        }
        else {
          this.dataSendList = ref.data;
        }
        this.isLoading = false;
    }, (_err: any) => {
      this.isLoading = false;
      this.generalService.showToastMessageError400(_err)
    });
  }

  get getFormArrayFiles() {
    return this.formGroup.get('files') as FormArray;
  }

  initFormFile(url): FormGroup {
    return this.fb.group({
      url: [url, [Validators.required, ValidatorNotEmptyString]],
    });
  }

  remove(index: number) {
    this.getFormArrayFiles.removeAt(index);
  }

  onChangeFileInputAvatar(event): void {//inputFor//học sinh-1, bố ruột-2, mẹ đẻ-3, người đỡ đầu-4
    if (event.target.files.length > 0) {
      // for (let i = 0; i < event.target.files.length; i++) {
      const file = (event.target as HTMLInputElement).files[0];
      if (file.size >= 500000){
        this.showMessageService.warning('validators.avatar.size');
        return;
      }
      var allowedExtensions = ["jpeg", "jpg", "png"]
      var extension = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        this.showMessageService.warning(translate('notification.validators.avatar.validate'));
        return;
      }
      this.isLoading = true;

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
          this.formGroup.get("avatar").setValue(res.data);// học sinh
          this.isLoading = false;
        }, (_err: any) => {
          this.generalService.showToastMessageError400(_err)
          this.isLoading = false;
        });
      })
    }
    // }
  }

  onDeleteFileInputAvatar(): void {
    this.fileInputAvatar.nativeElement.value = '';
    this.avatarUser = AVATAR_DEFAULT;
    this.formGroup.controls["avatar"].setValue('');// học sinh
  }

  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        if (file.size >= 2000000) {
          this.showMessageService.warning(translate('validators.file.size'));
          return;
        }
        else{
          var allowedExtensions = ["doc", "docx", "odt", "pdf", "ppt", "tex", "txt", "rtf", "wps", "wks", "wpd", "xlsx", "xlsm", "xls", "xlsb", "xltx", "xltm", "xlt", "jpeg", "jpg", "png", "mp3", "mp4", 'zar', "zip"];

          // var allowedExtensions =
          //   /(\.doc|\.docx|\.odt|\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd|\.xlsx|\.xlsm|\.xls|\.xlsb|\.xltx|\.xltm|\.xlt)$/i;

          var extension = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
          if (!allowedExtensions.includes(extension)) {
            this.showMessageService.warning(translate('notification.validators.files.validate'));
            return;
          }
          else{
            this.isLoading = true;
            this.generalService.postFile(file).subscribe((res: any) => {
                this.getFormArrayFiles.push(this.initFormFile(res.default));
                this.isLoading = false;
              },
              (_err: any) => {
                this.generalService.showToastMessageError400(_err)
                this.isLoading = false;
              })
          }
        }
      }
    } else return this.showMessageService.error('notification.uploadFileFalse');
  }

  onCheckboxChange(){
    this.checkedAll = this.formGroup.value.recipientGroups.filter(item => item.checked === false).length === 0? true : false;
    this.checkedNumberTrue = this.formGroup.value.recipientGroups.filter(item => item.checked === true).length;
  }

  onCheckboxChangeAll(){
    this.formGroup.value.recipientGroups.forEach((item, index) => {
      (this.formGroup.get('recipientGroups') as FormArray).at(index).get('checked').setValue(this.checkedAll)
    })
    this.checkedNumberTrue = this.formGroup.value.recipientGroups.filter(item => item.checked === true).length;
  }

  onChangeSelectScope(){
    if (this.formGroup.get('sendingScope').value !== 1 && this.formGroup.get('sendingScope').value !== null){
      this.formGroup.get('objectIds').setValidators([Validators.required])
    }
    else {
      this.formGroup.get('objectIds').clearValidators()
    }

    this.formGroup.get('objectIds').setValue([]);
    (this.formGroup.get('recipientGroups') as FormArray).clear();
    if (this.formGroup.get('sendingScope').value !== null){
      this.labelObject = this.dataSendingScope.find(item => item.value === Number(this.formGroup.get('sendingScope').value)).label;
      this.getDataRecipientGroupsList();
      this.getObjectsSendList();
    }
  }

  onSubmit(formValue): void {
    if (this.formGroup.valid && this.checkedNumberTrue > 0) {
      this.isLoading = true;
      // formValue.
      const dataInput: NotificationEdit = {
        id: this.notificationId,
        title: formValue.title,
        avatar: formValue.avatar,
        description: formValue.description,
        content: formValue.content,
        files: formValue.files.map(item => {return item.url}),
        sendingScope: formValue.sendingScope,
        recipientGroups: formValue.recipientGroups.filter(item => item.checked === true).map(item => {return item.value}),
        objectIds: formValue.objectIds,
        isAllowComment: formValue.isAllowComment ? 1 : 0,
        sendAt: formValue.sendNow === 1 ? null : formValue.sendAt,
        type: 1,
      }
      this.listenFireBase('update', 'announcement');
      this.notificationService.update(dataInput).subscribe((res: any) => {},
        (_err: any) => {
        this.isLoading = false;
        if (_err.status == 400) {
          this.validateAllFormFieldsErrorServer(_err.errors);
        }
        this.isLoading = false;
      })
    } else {
      this.validateAllFormFields(this.formGroup);
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

  openModalReviewNotification() {
    const modalRef = this.modalService.open(NotificationReviewContentTenantComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      keyboard: false,
      centered: false,
      size: 'xl'
    });
    modalRef.componentInstance.dataModal = this.formGroup.value;
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
        this.router.navigate(['/tenant/notification']);
      } else {
        this.isLoading = false;
      }
    });
  }

  clickCancel(){
    this.router.navigate(['/tenant/notification']);
  }
}
