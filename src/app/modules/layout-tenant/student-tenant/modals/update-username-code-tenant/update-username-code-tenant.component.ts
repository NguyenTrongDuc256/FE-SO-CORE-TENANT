import { translate } from '@ngneat/transloco';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { MESSAGE_ERROR_CALL_API, REGEX_CODE, REGEX_USER_NAME, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { Subscriber, Observable } from 'rxjs';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { GeneralService } from 'src/app/_services/general.service';
@Component({
  selector: 'app-update-username-code-tenant',
  templateUrl: './update-username-code-tenant.component.html',
  styleUrls: ['./update-username-code-tenant.component.scss']
})
export class UpdateUsernameCodeTenantComponent implements OnInit {
  @Input() dataModal: any;
  isLoading: boolean = false;
  infoForm!: FormGroup;
  dataSchoolLogo: string;
  validation_messages = {
    'code': [
      { type: 'required', message: translate('student.validators.code.required') },
      { type: 'pattern', message: translate('student.validators.code.pattern') },
    ],
    'username': [
      { type: 'required', message: translate('student.validators.username.required') },
      { type: 'minLength', message: translate('student.validators.username.minLength') },
      { type: 'maxLength', message: translate('student.validators.username.maxLength') },
      { type: 'pattern', message: translate('student.validators.username.pattern') },
    ]
  }

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private generalService: GeneralService,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      username: [this.dataModal.dataFromParent.username, [Validators.required, Validators.minLength(6), Validators.maxLength(50), Validators.pattern(REGEX_USER_NAME)]],
      code: [this.dataModal.dataFromParent.code, [Validators.required, Validators.pattern(REGEX_CODE)]],
    });
  }

  closeModal(sendData: any) {
    if (sendData == "accept") {
      this.saveFormData();
    } else {
      this.activeModal.close(false);
    }
  }

  saveFormData() {
    this.isLoading = true;
    let dataInput = {
      userId: this.dataModal.dataFromParent.studentUserId,
      username: this.infoForm.value.username,
      code: this.infoForm.value.code
    }
    this.listenFireBase("update", "user");
    this.generalService.changeUsernameCodeUserLayoutTenant(dataInput).subscribe((res: any) => {
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
