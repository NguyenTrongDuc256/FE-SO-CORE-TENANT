import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Observable, Subscriber } from 'rxjs';
import { PeriodService } from 'src/app/_services/layout-staff/declare/period.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  INFO_MOET_PERIOD, MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-period-form-staff',
  templateUrl: './period-form-staff.component.html',
  styleUrls: ['./period-form-staff.component.scss'],
})
export class PeriodFormStaffComponent implements OnInit {
  @Input() dataModal: any;
  infoForm!: FormGroup;
  public isLoading: boolean = false;
  dataFilter = {};
  isChecked: boolean = true;
  arrMoetPeriod = INFO_MOET_PERIOD;

  validation_messages = {
    Name: [
      { type: 'required', message: 'requiredName' },
      { type: 'maxlength', message: 'maxLengthName' },
      { type: 'pattern', message: 'declare.validators.name.pattern' },
    ],
    Code: [
      { type: 'required', message: 'requiredCode' },
      { type: 'maxlength', message: 'declare.validators.code.maxlength' },
      { type: 'pattern', message: 'patternCode' },
    ],
    MoetPeriod: [],
    DisplayOrder: [
      { type: 'required', message: 'declare.validators.displayOrder.required' },
    ],
    TimeStart: [
      { type: 'required', message: 'declare.validators.timeStart.required' },
    ],
    TimeEnd: [{ type: 'min', message: 'declare.validators.timeEnd.min' }],
  };

  validationMessagesServer = {
    Name: {},
    Code: {},
    DisplayOrder: {},
    MoetPeriod: {},
    TimeStart: {},
    TimeEnd: {},
  };

  constructor(
    private periodService: PeriodService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.infoForm = this.fb.group({
      Name: [
        this.dataModal.dataFromParent.Name,
        [Validators.required, Validators.maxLength(255)],
      ],
      Code: [
        this.dataModal.dataFromParent.Code,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(REGEX_CODE),
        ],
      ],
      MoetPeriod: [
        this.dataModal.dataFromParent.MoetPeriod,
      ],
      DisplayOrder: [
        this.dataModal.dataFromParent.IndexOrder ? this.dataModal.dataFromParent.IndexOrder : '1', [Validators.required]],
      TimeStart: [this.dataModal.dataFromParent.TimeStart],
      TimeEnd: [this.dataModal.dataFromParent.TimeEnd],
      ShowOnApp: [
        this.dataModal.dataFromParent.IndexOrderAppManager
          ? this.dataModal.dataFromParent.IndexOrderAppManager
          : '1',
      ],
    });
  }

  setTime(time: any) {
    let timeStart = time.infoForm.value.timeStart;
    let timeEnd = time.infoForm.value.TimeEnd;
    if (timeStart) {
      let arraytimeStart = timeStart.split(':');
      if (timeEnd) {
        this.infoForm.controls['TimeEnd'].setValidators([
          Validators.min(arraytimeStart[0]),
        ]);
        console.log(arraytimeStart[0]);
      }
    } else {
      if (timeEnd) {
        this.infoForm.controls['TimeStart'].setValidators([
          Validators.required,
        ]);
      }
    }
  }

  createPeriodStaff(dataForm) {
    this.dataFilter = {
      Name: dataForm.Name,
      Code: dataForm.Code,
      MoetPeriod: Number(dataForm.MoetPeriod),
      IndexOrder: Number(dataForm.DisplayOrder),
      TimeStart: dataForm.TimeStart,
      TimeEnd: dataForm.TimeEnd,
      IndexOrderAppManager: Number(dataForm.ShowOnApp),
    };
    this.listenFireBase('create', 'timetable-period');
    this.periodService.createPeriodStaff(this.dataFilter).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(err.errors);
      }
    );
  }

  updatePeriodStaff(dataForm) {
    this.dataFilter = {
      id: this.dataModal.dataFromParent.id,
      Name: dataForm.Name,
      Code: dataForm.Code,
      MoetPeriod: dataForm.MoetPeriod,
      IndexOrder: dataForm.DisplayOrder,
      TimeStart: dataForm.TimeStart,
      TimeEnd: dataForm.TimeEnd,
      IndexOrderAppManager: dataForm.ShowOnApp,
    };
    this.listenFireBase('update', 'timetable-period');
    this.periodService.updatePeriodStaff(this.dataFilter).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(err.errors);
      }
    );
  }

  onSubmit(dataForm: any) {
    this.isLoading = true;
    if (this.infoForm.valid) {
      if (this.dataModal.nameForm == 'create') {
        this.createPeriodStaff(dataForm);
      } else {
        this.updatePeriodStaff(dataForm);
      }
    } else {
      this.isLoading = false;
      this.validateAllFormFields(this.infoForm);
    }
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
    console.log('error', error)
    Object.keys(error).forEach((key) => {
      Object.keys(this.validation_messages).forEach((itemMessage) => {
        if (key == itemMessage) {
          this.validationMessagesServer[itemMessage] = {
            type: 'errorServer',
            message: error[key],
          };
        }
      });
    });
  }

  resetForm() {
    this.infoForm.get('Name').reset();
    this.infoForm.get('Code').reset();
    this.infoForm.get('MoetPeriod').setValue('null');
    this.infoForm.get('DisplayOrder').setValue('1');
    this.infoForm.get('TimeStart').setValue('');
    this.infoForm.get('TimeEnd').setValue('');
    this.infoForm.get('ShowOnApp').setValue('1');
  }

  listenFireBase(action: string, module: string) {
    const timeId = setTimeout(() => {
      if(this.isLoading){
        this.isLoading = false;
        this.showMessage.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status === true) {
        clearTimeout(timeId);
        if (action == 'create') {
          if (this.isChecked == false) {
            this.activeModal.close(true);
          }
          this.resetForm();
        } else {
          this.activeModal.close(true);
        }
      }
      this.isLoading = false;
    });
  }

  closeModal() {
    this.activeModal.close(false);
  }
}
