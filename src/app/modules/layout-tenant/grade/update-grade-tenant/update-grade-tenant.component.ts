import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { GradeService } from 'src/app/_services/layout-tenant/grade/grade.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-update-grade-tenant',
  templateUrl: './update-grade-tenant.component.html',
  styleUrls: ['./update-grade-tenant.component.scss']
})
export class UpdateGradeTenantComponent implements OnInit {
  @Input() dataModal: any;
  infoForm!: FormGroup;
  public isLoading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private gradeService: GradeService,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,

  ) { }

  ngOnInit() {
     this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      name: [this.dataModal.dataFromParent.name, [Validators.required, Validators.maxLength(255)]],
      educationalStages: this.dataModal.dataFromParent.educationalStages,
      isActive: this.dataModal.dataFromParent.isActive == 1 ? true : false
    });
  }

  updateGrade() {
    this.isLoading = true;
    let dataRequest = {
      id: this.dataModal.dataFromParent.id,
      name: this.infoForm.value.name,
      code: this.dataModal.dataFromParent.code,
      educationalStages: this.infoForm.value.educationalStages,
      isActive: this.infoForm.value.isActive ? 1 : 0
    }
    this.gradeService.updateGrade(dataRequest).subscribe((res: any) => {
      if (res.status == 0) {
        this.showMessage.error(res.msg);
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
      }
    },
      (err: any) => {
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

  onSubmit() {
    this.isLoading = true;
    this.listenFireBase('update', 'grades-manager');
    this.updateGrade();
  }

  validation_messages = {
    'name': [
      { type: 'required', message: translate('requiredName') },
      { type: 'maxlength', message: translate('maxLengthName') },
    ]
  }
}
