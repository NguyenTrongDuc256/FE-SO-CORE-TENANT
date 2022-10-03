import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { ModalInput } from 'src/app/_models/layout-tenant/general/general.model';
import { DIEMTRUONG } from 'src/app/_models/layout-tenant/school/school.model';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotEmptyString } from 'src/app/_services/validator-custom.service';
import {
  LAYOUTS_TENANT,
  MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
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

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
  ) {}

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.arrDistrict =  this.dataFromParent.arrDistrict;
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
        this.dataFromParent.nameForm == 'update'
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
    if (this.formSubmit.invalid)
      return this.showMessage.warning(translate('warmingValidateForm'));
    let dataInput = {
      MaDiemTruong: valueForm.MaDiemTruong.trim(),
      TenDiemTruong: valueForm.TenDiemTruong.trim(),
      DiaChi: valueForm.DiaChi ? valueForm.DiaChi.trim() : '',
      KhoangCach: valueForm.KhoangCach,
      PhuongTien: valueForm.PhuongTien,
      QuanHuyen: valueForm.QuanHuyen && valueForm.QuanHuyen != 'null' ? valueForm.QuanHuyen : null,
      DienTich: valueForm.DienTich,
      DienThoai: valueForm.DienThoai ? valueForm.DienThoai : null,
      Email: valueForm.Email ? valueForm.Email : null,
      TrangThai: Number(valueForm.TrangThai),
    };
    this.isLoading = true;
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );
    this.dataFromParent.apiSubmit(dataInput).subscribe(
      (res: any) => {
        if (res.status == 0) {
          this.isLoading = false;
          this.activeModal.close(false);
          this.showMessage.error(res.msg);
        }
      },
      (err: any) => {
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
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
}
