import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { SubjectService } from 'src/app/_services/layout-tenant/subject/subject.service';
import { REGEX_CODE, TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-update-subject-tenant',
  templateUrl: './update-subject-tenant.component.html',
  styleUrls: ['./update-subject-tenant.component.scss']
})
export class UpdateSubjectTenantComponent implements OnInit {
  @Input() dataModal: any;
  infoForm!: FormGroup;
  public isLoading: boolean = false;
  dataFilter = {};
  listOfOption: Array<{ label: string; value: number }> = [];
  listOfTagOptions = [];

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit() {
    this.listOfOption = [{ label: translate('subject.primarySchool'), value: 5 }, { label: translate('subject.secondarySchool'), value: 4 }, { label: translate('subject.highSchool'), value: 3 }];
    this.initForm();
  }
  initForm() {
    this.infoForm = this.fb.group({
      name: [this.dataModal.dataFromParent.name, [Validators.required, Validators.maxLength(255)]],
      code: [this.dataModal.dataFromParent.code, [Validators.required, Validators.maxLength(50), Validators.pattern(REGEX_CODE)]],
      educationalStages: [this.dataModal.dataFromParent.educationalStages, [Validators.required]],
      subjectType: this.dataModal.dataFromParent.subjectType,
      isActive: this.dataModal.dataFromParent.isActive ? true : false,
    });
  }

  updateSubject() {
    this.isLoading = true;
    this.dataFilter = {
      id: this.dataModal.dataFromParent.id,
      name: this.infoForm.value.name,
      code: this.infoForm.value.code,
      subjectType: this.infoForm.value.subjectType,
      educationalStages: this.infoForm.value.educationalStages,
      isActive: this.infoForm.value.isActive === true ? 1 : 0
    }
    this.subjectService.updateSubject(this.dataFilter).subscribe((res: any) => {
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
      });
  }

  onSubmit() {
    this.isLoading = true;
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
    'code': [
      { type: 'required', message: translate('requiredCode') },
      { type: 'maxlength', message: translate('maxLengthCode') },
      { type: "pattern", message: translate('patternCode') }
    ],
    'educationalStages': [
      { type: 'required', message: translate('subject.validators.educationalStages.required') },
    ]
  }
}

