import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import {
  LAYOUTS_TENANT,
  MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import { translate } from "@ngneat/transloco";
import { RoleForm } from 'src/app/_models/layout-tenant/role/role.model';

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

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
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
        [Validators.required, Validators.maxLength(255)],
      ],
      code: [
        this.dataFromParent.nameForm == 'update'
          ? this.dataFromParent?.role?.code
          : '',
        [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_CODE)],
      ],
      layoutCode: [
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
    if(this.formRole.invalid) return this.showMessage.warning(translate('warmingValidateForm'));
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
}