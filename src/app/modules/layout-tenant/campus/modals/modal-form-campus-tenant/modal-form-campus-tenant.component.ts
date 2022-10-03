
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MESSAGE_ERROR_CALL_API, REGEX_EMAIL, REGEX_PHONE, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { Subscriber, Observable } from 'rxjs';
import { CampusService } from 'src/app/_services/layout-tenant/campus/campus.service';
import { translate } from "@ngneat/transloco";

@Component({
  selector: 'app-modal-form-campus-tenant',
  templateUrl: './modal-form-campus-tenant.component.html',
  styleUrls: ['./modal-form-campus-tenant.component.scss']
})
export class ModalFormCampusTenantComponent implements OnInit {
  formGroup: FormGroup;
  @Input() dataModal: any;
  isLoading: boolean = false;
  checkFormUpdate: boolean = false;
  validationMessages = {
    name: [
      {
        type: "required",
        message: 'campus.validators.name.required'
      },
      {
        type:"maxlength",
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
        type:"maxlength",
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
    ]
  };

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private campusService: CampusService
  ) { }

  ngOnInit(): void {
    this.initForm(this.dataModal.dataFromParent);
  }

  initForm(data = null) {
    if (data) {
      this.checkFormUpdate = true;
    }
    this.formGroup = this.fb.group({
      name: [data?.name ? data.name : '', [Validators.required,Validators.maxLength(255)]],
      address: data?.address ? data.address : '',
      hotline: [data?.hotline ? data.hotline : '', Validators.pattern(REGEX_PHONE)],
      email: [data?.email ? data.email : '', [Validators.required, Validators.email]],
      contactName: [data?.contactName ? data.contactName : '', [Validators.required,Validators.maxLength(255)]],
      indexOrder: [data?.indexOrder ? data.indexOrder : '', [Validators.required]],
      contactEmail: [data?.contactEmail ? data.contactEmail : '', [Validators.required, Validators.email]],
      contactPhone: [data?.contactPhone ? data.contactPhone : '', [Validators.required, Validators.pattern(REGEX_PHONE)]],
      isActive: data?.isActive ? data.isActive == 1 ? true : false : false
    })
  }

  closeModal() {
    this.activeModal.close(false);
  }

  saveForm(dataForm: any) {
    this.isLoading = true;
    if (this.checkFormUpdate) {
      this.updateCampus(dataForm);
    } else {
      this.storeCampus(dataForm);
    }
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
    this.campusService.storeRole(dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
    })
  }

  updateCampus(dataForm) {
    const dataInput: any = {
      id: this.dataModal.dataFromParent.id,
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
    this.campusService.updateCampus(dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.isLoading = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
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
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
      }
    });
  }

}
