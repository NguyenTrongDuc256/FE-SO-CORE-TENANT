import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { Observable, Subscriber } from 'rxjs';
import { Course } from 'src/app/_models/layout-staff/training/course.model';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ResizeImageService } from 'src/app/_services/resize-image.service';
import {
  ValidatorNotEmptyString,
  ValidatorNotNull
} from 'src/app/_services/validator-custom.service';
import {
  REGEX_CODE, STATUS_COURSE,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import { ShowMessageService } from '../../../../../_services/show-message.service';

@Component({
  selector: 'app-form-course-layout-staff',
  templateUrl: './form-course-staff.component.html',
  styleUrls: ['./form-course-staff.component.scss', '../../helper.scss'],
})
export class FormCourseLStaffComponent implements OnInit {
  formSubmit: FormGroup;
  @Input() dataModal: any;
  dataFromParent: any;
  isLoading = false;
  logo = '';
  fileName = '';
  courseId: string;
  arrHomeroomClasses = [];
  arrGrades = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).grades : [];
  arrSubjects = localStorage.getItem('dataConfigSystem') ? JSON.parse(localStorage.getItem('dataConfigSystem')).subjects : [];
  arrStatus = STATUS_COURSE;
  isContinueCreate = false;
  nameForm: string;
  educationalStage = localStorage.getItem('currentUnit') ? JSON.parse(localStorage.getItem('currentUnit')).educationalStages : null;
  isLoadingUploadImg = false;
  validationMessagesServer = {
    name: {},
    code: {},
    gradeId: {},
    subjectId: {},
    homeroomClassId: {},
    startDate: {},
    endDate: {}
  };

  constructor(
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private generalService: GeneralService,
    private resizeImageService: ResizeImageService,
    private trainingService: TrainingService,
    private showMessageService: ShowMessageService,
    private router: Router,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.arrGrades = this.arrGrades.filter(item => item.isActive == 1 && item.educationalStages == this.educationalStage);
    this.arrSubjects = this.arrSubjects.filter(item => item.isActive == 1 && item.educationalStages.includes(this.educationalStage));
    this.dataFromParent = this.dataModal.dataFromParent;
    this.arrHomeroomClasses = this.dataFromParent.arrHomeroomClasses;
    this.nameForm = this.dataFromParent.nameForm;
    this.initForm();
    if(this.dataFromParent.nameForm == 'update') {
      this.patchValueForm(this.dataFromParent.course);
    }
  }

  initForm() {
    this.formSubmit = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          ValidatorNotEmptyString,
        ],
      ],
      code: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(REGEX_CODE),
        ],
      ],
      gradeId: ['', [Validators.required, ValidatorNotNull]],
      subjectId: ['', [Validators.required, ValidatorNotNull]],
      homeroomClassId: ['', [Validators.required, ValidatorNotNull]],
      startDate: '',
      endDate: '',
      status: STATUS_COURSE[2].value
    });
  }

  patchValueForm(valueForm: Course) {
    this.logo = valueForm?.avatar || '';
    this.formSubmit.setValue({
      name: valueForm?.name,
      code: valueForm?.code,
      gradeId: valueForm?.gradeId,
      subjectId: valueForm?.subjectId,
      homeroomClassId: valueForm?.homeroomClassId,
      startDate: valueForm?.startDate,
      endDate: valueForm?.endDate,
      status: valueForm?.status ? valueForm?.status : '',
    });
  }

  resetForm() {
    this.formSubmit.reset();
    this.formSubmit.get('gradeId').setValue('');
    this.formSubmit.get('subjectId').setValue('');
    this.formSubmit.get('homeroomClassId').setValue('');
    this.formSubmit.get('status').setValue(STATUS_COURSE[2].value);
  }

  submit(valueForm: Course) {
    if(valueForm.startDate > valueForm.endDate && valueForm.endDate) return this.showMessageService.warning(translate('patternEndDate'));
    if (this.formSubmit.valid) {
      let dataInput  = {
        avatar: this.logo,
        code: valueForm.code,
        name: valueForm.name,
        gradeId: valueForm.gradeId,
        subjectId: valueForm.subjectId,
        homeroomClassId: valueForm.homeroomClassId,
        startDate: valueForm.startDate == '' ? valueForm.startDate : +valueForm.startDate,
        endDate: valueForm.endDate == '' ? valueForm.endDate : +valueForm.endDate,
        status: valueForm.status != '' ? +valueForm.status : '',
      };
      this.isLoading = true;
      if (this.nameForm == 'create') {
        this.listenFireBase('create', 'course', this.isContinueCreate);
        this.trainingService.createCourse(dataInput).subscribe(
          (res: any) => {},
          (err) => {
            this.isLoading = false;
            this.validateAllFormFieldsErrorServer(err.errors);}
        );
      } else {
        this.listenFireBase('update', 'course', false);
        this.trainingService.updateCourse(this.dataFromParent.course.id, dataInput).subscribe(
          (res: any) => {},
          (err) => {
            this.isLoading = false;
            this.validateAllFormFieldsErrorServer(err.errors);
          }
        );
      }
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.formSubmit);
    }
  }

  continueCreate(isChecked: boolean, valueForm) {
    if(isChecked) {
      this.submit(valueForm);
    }
  }

  getDate(event: number, nameField: string) {
    if(nameField == 'start' && event != this.formSubmit.get('startDate').value) {
      this.formSubmit.get('startDate').setValue(event);
    }
    if(nameField == 'end' && event != this.formSubmit.get('endDate').value) {
      this.formSubmit.get('endDate').setValue(event);
    }
  }

  cancel() {
    this.router.navigate(['staff/homeroom-class']);
  }

  getExtension(image) {
    if (image.endsWith('jpg')) {
      return 'jpg';
    }
    if (image.endsWith('jpeg')) {
      return 'jpeg';
    }
    if (image.endsWith('png')) {
      return 'png';
    }
  }

  onChangeFileInputLogo(event): void {
    this.isLoadingUploadImg = true;
    if (event.target.files.length > 0) {
      const file = (event.target as HTMLInputElement).files[0];
      let allowExtensionImage = ['png', 'jpg', 'jpeg'];
      if (!allowExtensionImage.includes(this.getExtension(file?.type))) {
        this.showMessageService.warning(translate('msgCheckImg'));
        this.isLoadingUploadImg = false;
        return;
      }
      let dataReadFile = new Observable((subscriber: Subscriber<any>) => {
        this.resizeImageService.readFile(file, subscriber);
      });
      dataReadFile.subscribe((data) => {
        let dataInput = {
          base64Input: data,
          fileName: `${file.name}`,
        };
        this.fileName = `${file.name}`;
        this.generalService
          .uploadFileBase64(dataInput)
          .subscribe((res: any) => {
            this.logo = res.data;
            this.isLoadingUploadImg = false;
          });
      });
    } else this.isLoadingUploadImg = false;
  }

  removeLogo() {
    this.fileName = '';
    this.logo = '';
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  listenFireBase(action: string, module: string, isContinueCreate: boolean) {
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
        if(!isContinueCreate) {
          this.activeModal.close(true);
        } else {
          this.isContinueCreate = false;
          this.resetForm();
        }
      } else {
        this.isLoading = false;
      }
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((item: FormGroup) => {
          this.validateAllFormFields(item);
        });
      }
    });
  }

  validateAllFormFieldsErrorServer(error: any) {
    Object.keys(error).forEach((key) => {
      let arrKey = String(key).split('.');
      let indexKey = '';
      if (arrKey.length == 1) {
        this.validationMessagesServer[arrKey[0]] = {
          message: error[key],
        };
      } else {
        arrKey.forEach((itemKey: any) => {
          if (!isNaN(itemKey)) {
            indexKey += `${itemKey}`;
          }
          Object.keys(this.validationMessagesServer).forEach((itemMessage) => {
            if (itemMessage == arrKey[arrKey.length - 1]) {
              if (indexKey) {
                this.validationMessagesServer[itemMessage][indexKey] = {
                  message: error[key],
                };
              }
            }
          });
        });
      }
    });
  }

  getMessageServer(key, i) {
    let indexKey = `${i}`;
    return this.validationMessagesServer[key][indexKey];
  }

  validationMessages = {
    name: [
      {
        type: 'required',
        message: 'requiredName',
      },
      {
        type: 'maxlength',
        message: 'maxLengthName',
      },
      {
        type: 'notEmpty',
        message: 'requiredName',
      },
    ],
    code: [
      {
        type: 'required',
        message: 'requiredCode',
      },
      {
        type: 'maxlength',
        message: 'maxLengthCode',
      },
      {
        type: 'pattern',
        message: 'patternCode',
      },
    ],
    gradeId: [
      {
        type: 'notNull',
        message: 'training.requiredGrade',
      },
    ],
    subjectId: [
      {
        type: 'notNull',
        message: 'training.requiredSubject',
      },
    ],
    homeroomClassId: [
      {
        type: 'notNull',
        message: 'training.requiredHomeroomClass',
      },
    ],
  };
}
