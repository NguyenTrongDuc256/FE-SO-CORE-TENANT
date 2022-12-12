import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { SubjectService } from 'src/app/_services/layout-tenant/subject/subject.service';
import {
  MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';
@Component({
  selector: 'app-add-subject-tenant',
  templateUrl: './add-subject-tenant.component.html',
  styleUrls: ['./add-subject-tenant.component.scss'],
})
export class AddSubjectTenantComponent implements OnInit {
  @Input() dataModal: any;
  formGroup!: FormGroup;
  public isLoading: boolean = false;
  dataFilter = {};
  listOfOption: Array<{ label: string; value: number }> = [];
  listOfTagOptions = [1];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.listOfOption = [
      { label: translate('subject.primarySchool'), value: 5 },
      { label: translate('subject.secondarySchool'), value: 4 },
      { label: translate('subject.highSchool'), value: 3 },
    ];
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      code: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(REGEX_CODE),
        ],
      ],
      subjectType: 2,
      educationalStages: [[], [Validators.required, Validators.maxLength(50)]],
      isActive: true,
    });
  }

  createSubject(dataForm) {
    this.isLoading = true;
    this.dataFilter = {
      id: '',
      name: dataForm.name,
      code: dataForm.code,
      subjectType: dataForm.subjectType,
      educationalStages: dataForm.educationalStages,
      isActive: dataForm.isActive === true ? 1 : 0,
    };
    this.listenFireBase('create', 'subject');
    this.subjectService.createSubject(this.dataFilter).subscribe(
      (res: any) => {

      },
      (err: any) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(err.errors);
      }
    );
  }

  onSubmit(dataForm: any) {
    // this.createSubject(dataForm);
    this.isLoading = true;
    if (this.formGroup.valid) {
      this.createSubject(dataForm);
    } else {
      this.isLoading = false;
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


  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      this.isLoading = false;
      this.showMessage.error(MESSAGE_ERROR_CALL_API);
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

  closeModal(sendData: any) {
    this.activeModal.close(false);
  }

  validationMessagesServer = {
    name: {},
    code: {},
    subjectType: {},
    educationalStages: {},
    isActive: {}
  }

  validationMessages = {
    name: [
      { type: 'required', message: translate('requiredName') },
      { type: 'maxlength', message: translate('maxLengthName') },
      {
        type: 'pattern',
        message: translate('subject.validators.name.pattern'),
      },
    ],
    code: [
      { type: 'required', message: translate('requiredCode') },
      { type: 'maxlength', message: translate('maxLengthCode') },
      { type: 'pattern', message: translate('patternCode') },
    ],
    educationalStages: [
      {
        type: 'required',
        message: translate('subject.validators.educationalStages.required'),
      },
    ],
  };
}
