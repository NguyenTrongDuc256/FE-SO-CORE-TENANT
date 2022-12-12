import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { GradeService } from 'src/app/_services/layout-tenant/grade/grade.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { MESSAGE_ERROR_CALL_API, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-update-grade-tenant',
  templateUrl: './update-grade-tenant.component.html',
  styleUrls: ['./update-grade-tenant.component.scss'],
})
export class UpdateGradeTenantComponent implements OnInit {
  @Input() dataModal: any;
  formGroup!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private gradeService: GradeService,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [
        this.dataModal.dataFromParent.name,
        [Validators.required, Validators.maxLength(255)],
      ],
      educationalStages: this.dataModal.dataFromParent.educationalStages,
      isActive: this.dataModal.dataFromParent.isActive == 1 ? true : false,
    });
  }

  updateGrade(dataForm) {
    this.isLoading = true;
    let dataRequest = {
      id: this.dataModal.dataFromParent.id,
      name: dataForm.name,
      code: this.dataModal.dataFromParent.code,
      educationalStages: dataForm.educationalStages,
      isActive: dataForm.isActive ? 1 : 0,
    };
    this.listenFireBase('update', 'grades-manager');
    this.gradeService.updateGrade(dataRequest).subscribe(
      (res: any) => {
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

  onSubmit(dataForm: any) {
    // this.updateGrade(dataForm);

    this.isLoading = true;
    if (this.formGroup.valid) {
      this.updateGrade(dataForm);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  validationMessages = {
    name: [
      { type: 'required', message: translate('requiredName') },
      { type: 'maxlength', message: translate('maxLengthName') },
    ],
  };

  validationMessagesServer = {
    name: {},
  }
}
