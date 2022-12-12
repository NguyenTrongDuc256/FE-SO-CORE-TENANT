import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { ModalInput } from 'src/app/_models/layout-tenant/general/general.model';
import { DIEMTRUONG } from 'src/app/_models/layout-tenant/school/school.model';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import {
  LAYOUTS_TENANT, REGEX_CODE,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import { REGEX_PHONE } from './../../../../../_shared/utils/constant';

@Component({
  selector: 'app-modal-form-diem-truong',
  templateUrl: './modal-form-diem-truong.component.html',
  styleUrls: ['./modal-form-diem-truong.component.scss', '../../helper.scss'],
})
export class ModalFormDiemTruongComponent implements OnInit {
  @Input() dataModal: ModalInput;
  formSubmit: FormGroup;
  dataFromParent: any = null;
  isLoading = false;
  arrLayouts = LAYOUTS_TENANT;
  arrDistrict = [];
  isContinueCreate = false;

  validationMessages = {
    TenDiemTruong: [
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
    MaDiemTruong: [
      {
        type: "required",
        message: 'school.requiredCode'
      },
      {
        type: "pattern",
        message: 'patternCode'
      },
      {
        type: "maxlength",
        message: 'maxLengthCode'
      },
    ],
    KhoangCach: [
      {
        type: "pattern",
        message: 'school.onlyNumber'
      },
    ],
    DienTich: [
      {
        type: "pattern",
        message: 'school.onlyNumber'
      },
    ],
    DienThoai: [
      {
        type: "pattern",
        message: 'school.patternPhone'
      },
    ],
    Email: [
      {
        type: "email",
        message: 'school.patternEmail'
      },
    ],
  };
  validationMessagesServer = {
    TenDiemTruong: {},
    MaDiemTruong: {},
    KhoangCach: {},
    DienTich: {},
    DienThoai: {},
    Email: {}
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
  ) {
  }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.arrDistrict = this.dataFromParent.arrDistrict;
    this.initForm();
  }

  initForm() {
    this.formSubmit = this.fb.group({
      TenDiemTruong: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.diemTruong?.TenDiemTruong
          : '',
        [Validators.required, Validators.maxLength(255), ValidatorNotEmptyString],
      ],
      MaDiemTruong: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.diemTruong?.MaDiemTruong
          : '',
        [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(50)],
      ],
      DiaChi: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.diemTruong?.DiaChi
          : '',
      ],
      KhoangCach: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.diemTruong?.KhoangCach
          : null,
      ],
      PhuongTien: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.diemTruong?.PhuongTien
          : '',
      ],
      DienTich: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.diemTruong?.DienTich
          : null,
      ],
      DienThoai: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.diemTruong?.DienThoai
          : '',
        [Validators.pattern(REGEX_PHONE)],
      ],
      Email: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.diemTruong?.Email
          : '',
        [Validators.email],
      ],
      QuanHuyen: [
        this.dataFromParent.nameForm == 'update' && this.dataFromParent?.diemTruong?.QuanHuyen != ''
          ? this.dataFromParent?.diemTruong?.QuanHuyen
          : null,
      ],
      TrangThai: [
        this.dataFromParent.nameForm == 'update'
          ? Boolean(this.dataFromParent?.diemTruong?.TrangThai)
          : true,
      ],
    });
  }

  submit(valueForm: DIEMTRUONG) {
    if (this.formSubmit.valid) {
      let dataInput = {
        MaDiemTruong: valueForm.MaDiemTruong.trim(),
        TenDiemTruong: valueForm.TenDiemTruong.trim(),
        DiaChi: valueForm.DiaChi ? valueForm.DiaChi.trim() : '',
        KhoangCach: valueForm.KhoangCach,
        PhuongTien: valueForm.PhuongTien,
        QuanHuyen: valueForm.QuanHuyen && valueForm.QuanHuyen != 'null' ? valueForm.QuanHuyen : null,
        DienTich: valueForm.DienTich,
        DienThoai: valueForm.DienThoai ? valueForm.DienThoai : '',
        Email: valueForm.Email ? valueForm.Email : '',
        TrangThai: Number(valueForm.TrangThai),
      };
      this.isLoading = true;
      this.listenFireBase(
        this.dataFromParent.keyFirebaseAction,
        this.dataFromParent.keyFirebaseModule,
        this.isContinueCreate
      );
      this.dataFromParent.apiSubmit(dataInput).subscribe(
        (res: any) => {
          this.isLoading = false;
          this.activeModal.close(false);
        },
        (err: any) => {
          this.isLoading = false;
          this.validateAllFormFieldsErrorServer(err.errors);
        }
      );
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formSubmit);
    }
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

  resetForm() {
    this.formSubmit.reset();
    this.formSubmit.get('QuanHuyen').setValue('');
  }

  listenFireBase(action: string, module: string, isContinueCreate: boolean) {
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
        if (!isContinueCreate) {
          this.activeModal.close(true);
        } else {
          this.isContinueCreate = false;
          this.resetForm();
        }
      } else {
        this.isLoading = false;
      }
    });
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }
}
