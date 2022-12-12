import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { BehaviorConfigStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-config-staff.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-form-behavior-category-staff',
  templateUrl: './modal-form-behavior-category-staff.component.html',
  styleUrls: ['./modal-form-behavior-category-staff.component.scss']
})
export class ModalFormBehaviorCategoryStaffComponent implements OnInit {

  @Input() dataModal: any;
  formGroup!: FormGroup;
  isLoading: boolean = false;
  listIcon: Array<string> = [];
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private behaviorConfigStaffService: BehaviorConfigStaffService,

  ) { }

  ngOnInit(): void {
    this.listIcon = this.dataModal?.listIcon;
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      id: this.dataModal.dataFromParent.id ? this.dataModal.dataFromParent.id : '',
      name: [this.dataModal.dataFromParent ? this.dataModal.dataFromParent.name : '', [Validators.required, Validators.maxLength(255)]],
      avatar: [this.dataModal.dataFromParent ? this.dataModal.dataFromParent.avatar : "assets/images/svg/orientation.svg"],
      description: this.dataModal.dataFromParent ? this.dataModal.dataFromParent.description : '',
    });
  }

  createBehaviorCategory() {
    this.isLoading = true;
    let dataRequest = {
      name: this.formGroup.value.name,
      avatar: this.formGroup.value.avatar,
      description: this.formGroup.value.description ? this.formGroup.value.description : null,
    }
    this.listenFireBase('create', 'behavior-category');
    this.behaviorConfigStaffService.createBehaviorCategory(dataRequest).subscribe((res: any) => {
      this.isLoading = false;
   
    }, (err: any) => {
      this.isLoading = false;
      this.validateAllFormFieldsErrorServer(err.errors);
    });
  }

  updateBehaviorCategory() {
    this.isLoading = true;
    let dataRequest = {
      id: this.formGroup.value.id,
      name: this.formGroup.value.name,
      avatar: this.formGroup.value.avatar,
      description: this.formGroup.value.description ? this.formGroup.value.description : null,
    }
    this.listenFireBase('update', 'behavior-category');
    this.behaviorConfigStaffService.updateBehaviorCategory(dataRequest).subscribe((res: any) => {
      this.isLoading = false;
      
    }, (err: any) => {
      this.isLoading = false;
      this.validateAllFormFieldsErrorServer(err.errors);
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.formGroup.valid) {
      if (this.dataModal.dataFromParent) {
        this.updateBehaviorCategory();
      } else {
        this.createBehaviorCategory();
      }
    } else {
      this.validateAllFormFields(this.formGroup);
    }
  }

  getIcon(avatar) {
    this.formGroup.controls["avatar"].setValue(avatar);
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
      Object.keys(this.validationMessages).forEach(itemMessage => {
        if (key == itemMessage) {
          this.validationMessagesServer[itemMessage] = {
            type: "errorServer",
            message: error[key]
          }
        }
      });
    });
  }

  validationMessages = {
    name: [
      {
        type: "required",
        message: 'Tên danh mục không được để trống'
      },
      {
        type: "maxlength",
        message: 'Tên danh mục không được vượt quá 255 ký tự'
      }
    ]
  };
  validationMessagesServer = {
    name: {},
    avatar: {},
    description: {},
  }
}