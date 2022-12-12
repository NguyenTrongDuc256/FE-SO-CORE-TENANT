import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  MAX_LENGTH_CODE,
  MAX_LENGTH_USERNAME,
  MESSAGE_ERROR_CALL_API, REGEX_CODE,
  REGEX_USER_NAME,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import { REGEX_PASSWORD } from './../../utils/constant';
@Component({
  selector: 'app-modal-change-username-code',
  templateUrl: './modal-change-username-code.component.html',
  styleUrls: ['./modal-change-username-code.component.scss']
})
export class ModalChangeUsernameCodeComponent implements OnInit {

  @Input() dataModal: any;
  dataFromParent: any;
  isLoading = false;
  isSubmit = false;
  formGroup: FormGroup;

  validationMsg = {
    username: [
      {
        type: "required",
        message: 'validators.username.required',
      },
      {
        type: "pattern",
        message: 'validators.username.pattern',
      },
      {
        type: "maxlength",
        message: 'validators.username.maxlength',
      }
    ],
    code: [
      {
        type: "required",
        message: 'validators.code.required',
      },
      {
        type: "pattern",
        message: 'validators.code.pattern',
      },
      {
        type: "maxlength",
        message: 'validators.code.maxlength',
      }
    ],
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(REGEX_USER_NAME), Validators.maxLength(MAX_LENGTH_USERNAME)]],
      code: ['', [Validators.required, Validators.pattern(REGEX_CODE), Validators.maxLength(MAX_LENGTH_CODE)]],
    });
  }

  submit(formValue: any) {
    this.isLoading = true;
    if (this.formGroup.valid) {
      this.saveForm(formValue);
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formGroup);
    }
  }

  saveForm(formValue: any) {
    this.isSubmit = true;
    if (this.formGroup.invalid) {
      return;
    }
    let dataInput = {
      userId: this.dataFromParent.userId,
      username: formValue.username,
      code: formValue.code,
    };

    this.listenFireBase(this.dataFromParent.keyFirebaseAction, this.dataFromParent.keyFirebaseModule);
    this.dataFromParent.apiSubmit(dataInput).subscribe(
      (res: any) => {
        if (res.status == 0) {
          this.isLoading = false;
          this.isSubmit = false;
          this.showMessage.error(res.msg);
        }
      },
      (err: any) => {
        this.isLoading = false;
        this.isSubmit = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    );
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

}
