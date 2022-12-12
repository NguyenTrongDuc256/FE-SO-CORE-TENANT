import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ShowMessageService} from '../../../../../_services/show-message.service';
import {ListenFirebaseService} from '../../../../../_services/listen-firebase.service';
import {
  INFO_MOET_PERIOD, MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
  TIME_OUT_LISTEN_FIREBASE,
  TYPE_CATE_STUDENT_RECORDS,
} from '../../../../../_shared/utils/constant';
import {Observable, Subscriber} from 'rxjs';
import {ProfileStaffService} from '../../../../../_services/layout-staff/declare/profile-staff.service';

@Component({
  selector: 'app-profile-form-staff',
  templateUrl: './profile-form-staff.component.html',
  styleUrls: ['./profile-form-staff.component.scss'],
})
export class ProfileFormStaffComponent implements OnInit {
  @Input() dataModal: any;
  infoForm!: FormGroup;
  public isLoading: boolean = false;
  dataFilter = {};
  isChecked: boolean = true;
  valueStaff = TYPE_CATE_STUDENT_RECORDS.STAFF;
  valueStudent = TYPE_CATE_STUDENT_RECORDS.STUDENT;
  isCheckCode: boolean = true;
  validation_messages = {
    name: [
      {type: 'required', message: 'requiredName'},
      {type: 'maxlength', message: 'maxLengthName'},
    ],
    code: [
      {type: 'required', message: 'requiredCode'},
      {type: 'maxlength', message: 'profile.validators.code.maxlength'},
      {type: 'pattern', message: 'patternCode'},
    ],
    type: [{type: 'required', message: 'profile.validators.type.required'}],
  };

  validationMessagesServer = {
    name: {},
    code: {},
    type: {},
  };

  constructor(
    private profileStaffService: ProfileStaffService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      name: [
        this.dataModal.dataFromParent.name,
        [Validators.required, Validators.maxLength(255)],
      ],
      code: [
        this.dataModal.dataFromParent.code,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(REGEX_CODE),
        ],
      ],
      type: [this.dataModal.dataFromParent.type ? this.dataModal.dataFromParent.type : 1, [Validators.required]],
      isImperative: [
        this.dataModal.dataFromParent.isImperative == 1 ? true : false,
        [Validators.required],
      ],
      note: [this.dataModal.dataFromParent.note],
      indexOrder: [
        this.dataModal.indexOrder ? this.dataModal.indexOrder : 0,
        [Validators.required],
      ],
    });
  }

  createProfileStaff(dataForm) {
    this.dataFilter = {
      name: dataForm.name,
      code: dataForm.code,
      type: dataForm.type,
      isImperative: dataForm.isImperative ? 1 : 0,
      note: dataForm.note,
      indexOrder: dataForm.indexOrder,
    };
    console.log(this.dataFilter)
    this.listenFireBase('create', 'file-category');
    this.profileStaffService.createProfileStaff(this.dataFilter).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(err.errors);
      }
    );
  }

  updateProfileStaff(dataForm) {
    this.dataFilter = {
      id: this.dataModal.dataFromParent.id,
      name: dataForm.name,
      code: dataForm.code,
      type: dataForm.type,
      isImperative: dataForm.isImperative ? 1 : 0,
      note: dataForm.note,
      indexOrder: dataForm.indexOrder,
    };
    this.listenFireBase('update', 'file-category');
    this.profileStaffService.updateProfileStaff(this.dataFilter).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(err.errors);
      }
    );
  }

  onSubmit(dataForm: any) {
    this.isLoading = true;
    if (this.infoForm.valid) {
      if (this.dataModal.nameForm == 'create') {
        this.createProfileStaff(dataForm);
      } else {
        this.updateProfileStaff(dataForm);
      }
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.infoForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        });
      }
    });
  }

  validateAllFormFieldsErrorServer(error: any) {
    console.log('error', error)
    Object.keys(error).forEach((key) => {
      Object.keys(this.validation_messages).forEach((itemMessage) => {
        if (key == itemMessage) {
          this.validationMessagesServer[itemMessage] = {
            type: 'errorServer',
            message: error[key],
          };
        }
      });
    });
  }

  resetForm() {
    this.infoForm.get('name').reset();
    this.infoForm.get('code').reset();
    this.infoForm.get('type').setValue('null');
    this.infoForm.get('isImperative').setValue('true');
    this.infoForm.get('note').setValue('');
    this.infoForm.get('indexOrder').setValue('0');
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        if (action == 'create') {
          if (this.isChecked == false) {
            this.activeModal.close(true);
          }
          this.resetForm();
        } else {
          this.activeModal.close(true);
        }
      }
      this.isLoading = false;
    });
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }


}
