import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MESSAGE_ERROR_CALL_API, REGEX_PHONE, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { Subscriber, Observable } from 'rxjs';
import { CampusService } from 'src/app/_services/layout-tenant/campus/campus.service';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.scss']
})
export class FormExampleComponent implements OnInit {
  formGroup: FormGroup;
  isLoading: boolean = false;
  checkFormUpdate: boolean = false;
  validationMessages = {
    name: [
      {
        type: "required",
        message: 'campus.validators.name.required'
      },
      {
        type: "maxlength",
        message: 'campus.validators.name.maxlength'
      }
    ],
    hotline: [
      {
        type: "pattern",
        message: 'campus.validators.hotline.pattern'
      }
    ],
    email: [
      {
        type: "email",
        message: 'campus.validators.email.pattern'
      },
      {
        type: "required",
        message: 'campus.validators.email.required'
      }
    ],
    contactName: [
      {
        type: "required",
        message: 'campus.validators.contactName.required'
      },
      {
        type: "maxlength",
        message: 'campus.validators.contactName.maxlength'
      }
    ],
    contactEmail: [
      {
        type: "email",
        message: 'campus.validators.contactEmail.pattern'
      },
      {
        type: "required",
        message: 'campus.validators.contactEmail.required'
      }
    ],
    contactPhone: [
      {
        type: "pattern",
        message: 'campus.validators.contactPhone.pattern'
      },
      {
        type: "required",
        message: 'campus.validators.contactPhone.required'
      }
    ],
    indexOrder: [
      {
        type: "required",
        message: 'campus.validators.indexOrder.required'
      }
    ],
    arrName: [
      {
        type: "required",
        message: 'campus.validators.name.required'
      }
    ]
  };
  validationMessagesServer = {
    name: {},
    hotline: {},
    email: {},
    contactName: {},
    contactEmail: {},
    contactPhone: {},
    indexOrder: {},
    arrName: {}
  }

  constructor(
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private campusService: CampusService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.initArr();
  }

  initForm(data = null) {
    if (data) {
      this.checkFormUpdate = true;
    }
    this.formGroup = this.fb.group({
      name: [data?.name ? data.name : '', [Validators.required, Validators.maxLength(255)]],
      address: data?.address ? data.address : '',
      hotline: [data?.hotline ? data.hotline : '', Validators.pattern(REGEX_PHONE)],
      email: [data?.email ? data.email : '', [Validators.required, Validators.email]],
      contactName: [data?.contactName ? data.contactName : '', [Validators.required, Validators.maxLength(255)]],
      indexOrder: [data?.indexOrder ? data.indexOrder : 1, [Validators.required]],
      contactEmail: [data?.contactEmail ? data.contactEmail : '', [Validators.required, Validators.email]],
      contactPhone: [data?.contactPhone ? data.contactPhone : '', [Validators.required, Validators.pattern(REGEX_PHONE)]],
      isActive: data?.isActive ? data.isActive == 1 ? true : false : false,
      dataArray: new FormArray([])
    })
  }

  initArr() {
    if (this.formGroup) {
      for (let index = 0; index < 5; index++) {
        const element = this.formGroup.get('dataArray') as FormArray;
        element.push(this.addDatdaArr());
      }
    }
  }

  addDatdaArr() {
    return this.fb.group({
      arrName: ['', [Validators.required]]
    })
  }

  get getFormArray() {
    return this.formGroup.get('dataArray') as FormArray;
  }

  getFormGroupOfFormArray(index: number) {
    return this.getFormArray.controls[index] as FormGroup;
  }

  submitForm(dataForm: any) {
    this.isLoading = true;
    if (this.formGroup.valid) {
      if (this.checkFormUpdate) {
        this.updateCampus(dataForm);
      } else {
        this.storeCampus(dataForm);
      }
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
    console.log("error", error);
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

  storeCampus(dataForm) {
    const dataInput: any = {
      name: dataForm.name,
      indexOrder: dataForm.indexOrder,
      address: dataForm.address,
      hotline: dataForm.hotline,
      email: dataForm.email,
      contactName: dataForm.contactName,
      contactEmail: dataForm.contactEmail,
      contactPhone: dataForm.contactPhone,
      isActive: dataForm.isActive ? 1 : 0
    }
    this.listenFireBase("create", "campus");
    this.campusService.storeRole(dataInput).subscribe((res: any) => { }, (_err: any) => {
      this.isLoading = false;
      if (_err.status == 400) {
        _err.errors = {
          ..._err.errors,
          ...{
            'data.0.arrName': ['Chưa nhập thông tin'],
            'data.1.arrName': ['Chưa nhập thông tin'],
            'data.2.arrName': ['Chưa nhập thông tin'],
            'data.4.arrName': ['Chưa nhập thông tin']
          }
        };
        this.validateAllFormFieldsErrorServer(_err.errors);
      }
    })
  }

  cancelForm() {

  }

  updateCampus(dataForm) {
    const dataInput: any = {
      id: '71b17807-668f-482e-bddb-fb8ce1d42431',
      indexOrder: dataForm.indexOrder,
      name: dataForm.name,
      address: dataForm.address,
      hotline: dataForm.hotline,
      email: dataForm.email,
      contactName: dataForm.contactName,
      contactEmail: dataForm.contactEmail,
      contactPhone: dataForm.contactPhone,
      isActive: dataForm.isActive ? 1 : 0
    }
    this.listenFireBase("update", "campus");
    this.campusService.updateCampus(dataInput).subscribe((res: any) => { }, (_err: any) => {
      this.isLoading = false;
      if (_err.status == 400) {
        _err.errors = {
          ..._err.errors,
          ...{
            'data.0.arrName': ['Chưa nhập thông tin'],
            'data.1.arrName': ['Chưa nhập thông tin'],
            'data.2.arrName': ['Chưa nhập thông tin'],
            'data.4.arrName': ['Chưa nhập thông tin']
          }
        };
        this.validateAllFormFieldsErrorServer(_err.errors);
      }
    })
  }

  listenFireBase(action: string, module: string) {
    setTimeout(() => {
      if (this.isLoading == true) {
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
      } else {
        this.isLoading = false;
      }
    });
  }

}