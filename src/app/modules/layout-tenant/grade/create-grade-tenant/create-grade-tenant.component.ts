
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { GradeService } from 'src/app/_services/layout-tenant/grade/grade.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { REGEX_CODE, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-create-grade-tenant',
  templateUrl: './create-grade-tenant.component.html',
  styleUrls: ['./create-grade-tenant.component.scss']
})
export class CreateGradeTenantComponent implements OnInit {
  isLoading: boolean = false;
  @Input() dataModal: any;
  infoForm: FormGroup;
  validation_messages = {
    'name': [
      { type: 'required', message: translate('requiredName') },
      { type: 'maxlength', message: translate('maxLengthName') }
    ],
    'code': [
      { type: 'required', message: translate('requiredCode') },
      { type: 'pattern', message: translate('patternCode') },
      { type: 'maxlength', message: translate('maxLengthCode') }
    ]
    
  }
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private gradeService: GradeService,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      code: ['', [Validators.required,Validators.maxLength(50), Validators.pattern(REGEX_CODE)]],
      educationalStages: 5,
      isActive: true
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.listenFireBase('create', 'grades-manager');
    this.storeGrade();
  }

  storeGrade() {
    this.isLoading = true;
    let dataRequest = {
      name: this.infoForm.value.name,
      code: this.infoForm.value.code,
      educationalStages: Number(this.infoForm.value.educationalStages),
      isActive: this.infoForm.value.isActive ? 1 : 0
    }
    this.gradeService.createGrade(dataRequest).subscribe((res: any) => {
      if (res.status == 0) {
        this.showMessage.error(res.msg);
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
      }
    },
      (_err: any) => {
        this.isLoading = false;
      })
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
