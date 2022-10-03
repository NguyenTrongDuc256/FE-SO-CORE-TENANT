import { REGEX_LINK } from './../../../../../_shared/utils/constant';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import {
  FILE_ATTACHS_TYPE,
  MESSAGE_ERROR_CALL_API,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';
import { Observable, Subscriber } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValidatorNotEmptyString, ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { GeneralService } from 'src/app/_services/general.service';
import { translate } from '@ngneat/transloco';

@Component({
  selector: 'app-modal-form-records-teacher',
  templateUrl: './modal-form-records.component.html',
  styleUrls: ['./modal-form-records.component.scss', '../../helper.scss'],
})
export class ModalFormRecordsTeacherComponent implements OnInit {
  isLoading = false;
  dataFromParent: any;
  @Input() dataModal: any;
  arrCategories = [];
  formSubmit: FormGroup;
  typesFile = FILE_ATTACHS_TYPE;
  base64File: any = null;
  isHiddenElement =  false;

  constructor(
    public activeModal: NgbActiveModal,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private fb: FormBuilder,
    private generalService: GeneralService,
  ) {}

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.arrCategories = this.dataFromParent.arrCate;
    this.initForm(this.dataFromParent.valueUpdate);
  }

  initForm(valueForm: any) {
    this.formSubmit = this.fb.group({
      name: [
        this.dataFromParent.nameForm == 'update'
          ? valueForm.name
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      categoryId: [
        this.dataFromParent.nameForm == 'update'
          ? valueForm.fileCategoryId
          : '',
        [Validators.required, ValidatorNotNull],
      ],
      isSendNoti: false,
      fileAttachs: this.fb.array([
        this.fb.group({
          nameFile:
            [this.dataFromParent.nameForm == 'update'
            ? valueForm.fileAttachs[0].name
            : '', [Validators.required, ValidatorNotEmptyString]],
          url:
            [this.dataFromParent.nameForm == 'update'
            ? valueForm.fileAttachs[0].url
            : '', [Validators.required, ValidatorNotEmptyString]],
          fileType:
            this.dataFromParent.nameForm == 'update'
              ? valueForm.fileAttachs[0].fileType
              : FILE_ATTACHS_TYPE.FILE,
          nameFileLocal: '',
        }),
      ]),
    });

    if(this.dataFromParent.nameForm == 'update' && valueForm.fileAttachs.length == 1) {
      this.isHiddenElement = true;
    }
    if(this.dataFromParent.nameForm == 'update' && valueForm.fileAttachs.length > 1) {
      for (let index = 1; index < valueForm.fileAttachs.length; index++) {
        this.create(valueForm.fileAttachs[index]);
      }
    }
  }

  get getFormArray() {
    return this.formSubmit.get('fileAttachs') as FormArray;
  }

  getFormGroupOfFormArray(index: number) {
    return this.getFormArray.controls[index] as FormGroup;
  }

  initFormFile(dataForm: any): FormGroup {
    return this.fb.group({
      nameFile: [dataForm ? dataForm.name : '', [Validators.required, ValidatorNotEmptyString]],
      url: [dataForm ? dataForm.url : '', [Validators.required, ValidatorNotEmptyString, Validators.pattern(REGEX_LINK)]],
      fileType: dataForm ? dataForm.fileType : FILE_ATTACHS_TYPE.FILE,
      nameFileLocal: '',
    });
  }

  remove(index: number) {
    this.getFormArray.removeAt(index);
  }

  create(dataForm: any) {
    this.getFormArray.push(this.initFormFile(dataForm));
    this.isHiddenElement = false;
  }

  changeTypeFile(typeFile: number, indexFormGroup: number) {
    this.getFormGroupOfFormArray(indexFormGroup).controls['nameFile'].setValue('');
    if(typeFile == this.typesFile.FILE) {
      this.getFormGroupOfFormArray(indexFormGroup).controls['nameFileLocal'].setValue('');
    }
    if(typeFile == this.typesFile.LINK) {
      this.getFormGroupOfFormArray(indexFormGroup).controls['url'].setValue('');
    }
  }

  submit(valueForm: any) {
    if(this.formSubmit.invalid) return this.showMessage.warning(translate('warmingValidateForm'));
    if(valueForm.fileAttachs.length == 0) return this.showMessage.warning('studentRecords.warmingWithoutFileAttachs');
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );
    // let arr = valueForm.fileAttachs.map(item => {'name': item.name, 'url': item.url, 'fileType': +item.fileType})
    let arr = [];
    valueForm.fileAttachs.forEach((item) => {
      arr.push({
        name: item.nameFile,
        url: item.url,
        fileType: +item.fileType,
      });
    });
    let dataInput = {
      fileCategoryId: valueForm.categoryId,
      name: valueForm.name,
      isSendNotification: +valueForm.isSendNoti,
      fileAttachs: arr,
    };
    if (this.dataFromParent.nameForm == 'create') {
      dataInput['userId'] = this.dataFromParent.userId;
    }

    this.dataFromParent.apiSubmit(dataInput).subscribe(
      (res: any) => {
        if (res.status == 0) {
          this.isLoading = false;
          this.showMessage.error(res.msg);
        }
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    );
  }

  onChangeFile(event: any, indexForm: number) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.generalService.postFile(file).subscribe((res: any) => {
        if (res.status == 1) {
          this.getFormArray.controls[indexForm]
            .get('nameFileLocal')
            .setValue(file.name);
          this.getFormArray.controls[indexForm]
            .get('url')
            .setValue(res.default);
        } else return this.showMessage.error('studentRecords.uploadFileFalse');
      });
    } else return this.showMessage.error('studentRecords.uploadFileFalse');
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
