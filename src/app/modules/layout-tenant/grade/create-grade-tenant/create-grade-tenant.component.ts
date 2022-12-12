import { Component, OnInit, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { GradeService } from 'src/app/_services/layout-tenant/grade/grade.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-create-grade-tenant',
  templateUrl: './create-grade-tenant.component.html',
  styleUrls: ['./create-grade-tenant.component.scss'],
})
export class CreateGradeTenantComponent implements OnInit {
  isLoading: boolean = false;
  @Input() dataModal: any;
  formGroup: FormGroup;
  validationMessages = {
    name: [
      { type: 'required', message: translate('requiredName') },
      { type: 'maxlength', message: translate('maxLengthName') },
    ],
    code: [
      { type: 'required', message: translate('requiredCode') },
      { type: 'pattern', message: translate('patternCode') },
      { type: 'maxlength', message: translate('maxLengthCode') },
    ],
  };

  validationMessagesServer = {
    name: {},
    code: {},
    educationalStages: {},
    isActive: {}
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private gradeService: GradeService,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) { }

  ngOnInit(): void {
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
      educationalStages: 5,
      isActive: true,
    });
  }

  onSubmit(dataForm: any) {
    //this.storeGrade(dataForm);
    this.isLoading = true;
    if (this.formGroup.valid) {
      this.storeGrade(dataForm);
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

  storeGrade(dataForm) {
    this.isLoading = true;
    let dataRequest = {
      name: dataForm.name,
      code: dataForm.code,
      educationalStages: Number(dataForm.educationalStages),
      isActive: dataForm.isActive ? 1 : 0,
    };
    this.listenFireBase('create', 'grades-manager');
    this.gradeService.createGrade(dataRequest).subscribe(
      (res: any) => {
      },
      (_err: any) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(_err.errors);

      }
    );
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
}
