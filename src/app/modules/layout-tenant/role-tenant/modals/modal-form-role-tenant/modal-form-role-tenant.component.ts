import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { RoleForm } from 'src/app/_models/layout-tenant/role/role.model';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ValidatorNotNull, ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import {
  LAYOUTS_TENANT, REGEX_CODE,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-form-role-tenant',
  templateUrl: './modal-form-role-tenant.component.html',
  styleUrls: ['./modal-form-role-tenant.component.scss', '../../helper-role.scss'],
})
export class ModalFormRoleTenantComponent implements OnInit {
  @Input() dataModal: any;
  formRole: FormGroup;
  dataFromParent: any;
  isLoading = false;
  arrLayouts = LAYOUTS_TENANT;
  validationMessagesServer = {
    name: {},
    code: {},
    requestLayout: {}
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
  ) {}

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.initForm();
  }

  initForm() {
    this.formRole = this.fb.group({
      name: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.role?.name
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      code: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.role?.code
          : '',
        [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_CODE)],
      ],
      requestLayout: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.role?.layout
          : null,
        [Validators.required, ValidatorNotNull],
      ],
      desc: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.role?.description
          : '',
      ],
    });
  }

  submit(valueForm: RoleForm) {
    if (this.formRole.valid) {
      let dataInput = {
        name: valueForm.name.trim(),
        code: valueForm.code.trim(),
        requestLayout: valueForm.layoutCode,
        description: valueForm.desc,
      };
      if (this.dataFromParent.nameForm == 'update') {
        // form update
        dataInput['id'] = this.dataFromParent?.role?.id;
      }
      this.isLoading = true;
      this.listenFireBase(
        this.dataFromParent.keyFirebaseAction,
        this.dataFromParent.keyFirebaseModule
      );
      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => {},
        (err: any) => {
          this.isLoading = false;
          this.validateAllFormFieldsErrorServer(err.errors);
        }
      );
    } else {
       this.isLoading = false;
       this.validateAllFormFields(this.formRole);
    }
  }

  mapNameLayout() {
    return (
      LAYOUTS_TENANT.find((layout) => layout.code == this.dataFromParent?.role?.layout)?.name ||
      '--'
    );
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

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
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

  getMessageServer(key, i) {
    let indexKey = `${i}`;
    return this.validationMessagesServer[key][indexKey];
  }

  validationMessages = {
    name: [
      {
        type: "required",
        message: 'requiredName'
      },
      {
        type: "maxlength",
        message: 'maxLengthName'
      },
      {
        type: "notEmpty",
        message: 'requiredName'
      }
    ],
    code: [
      {
        type: "required",
        message: 'requiredCode'
      },
      {
        type: "maxlength",
        message: 'maxLengthCode'
      },
      {
        type: "pattern",
        message: 'patternCode'
      }
    ],
    requestLayout: [
      {
        type: "notNull",
        message: 'role.requiredLayout'
      },
    ]
  };
}
