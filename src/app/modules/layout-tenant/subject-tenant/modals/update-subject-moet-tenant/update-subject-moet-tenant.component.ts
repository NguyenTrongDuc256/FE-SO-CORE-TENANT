import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { SubjectService } from 'src/app/_services/layout-tenant/subject/subject.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-update-subject-moet-tenant',
  templateUrl: './update-subject-moet-tenant.component.html',
  styleUrls: ['./update-subject-moet-tenant.component.scss']
})
export class UpdateSubjectMoetTenantComponent implements OnInit {

  @Input() dataModal: any;
  infoForm!: FormGroup;
  public isLoading: boolean = false;
  dataFilter = {};

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private subjectService: SubjectService,

  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      name: [this.dataModal.dataFromParent.name, [Validators.required, Validators.maxLength(255)]],
      displayOrder: ['', [Validators.pattern('^[0-9]+$')]],
      isActive: true,
    });
  }

  updateSubject() {
    this.isLoading = true;
    this.dataFilter = {
      id: this.dataModal.dataFromParent.id,
      name: this.infoForm.value.name,
      code: this.dataModal.dataFromParent.code,
      subjectType: this.dataModal.dataFromParent.subjectType,
      displayOrder: this.infoForm.value.displayOrder,
      educationalStages: this.dataModal.dataFromParent.educationalStages,
      isActive: this.infoForm.value.isActive === true ? 1 : 0
    }

    // this.subjectService.updateSubject(this.dataFilter).subscribe((res: any) => {
    //   if (res.status == 0) {
    //     this.showMessage.error(res.msg);
    //     this.isLoading = false;
    //   }
    //   else {
    //     this.isLoading = false;
    //   }
    // }, (err: any) => {
    //   this.isLoading = false;
    // });
  }

  onSubmit() {
    this.listenFireBase('update', 'subject');
    this.updateSubject();
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

  validation_messages = {
    'name': [
      { type: 'required', message: translate('requiredName') },
      { type: 'maxlength', message: translate('maxLengthName') },
      { type: "pattern", message: translate('subject.validators.name.pattern') }

    ],
    'displayOrder': [
      { type: 'pattern', message: translate('subject.validators.displayOrder.pattern') },
    ]
  }
}

