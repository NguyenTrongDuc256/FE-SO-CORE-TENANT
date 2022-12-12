import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { infrastructureService } from 'src/app/_services/layout-staff/declare/infrastructure.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import {
  MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-building-form-staff',
  templateUrl: './modal-building-form-staff.component.html',
  styleUrls: ['./modal-building-form-staff.component.scss'],
})
export class ModalBuildingFormStaffComponent implements OnInit {
  @Input() dataModal: any;
  infoForm!: FormGroup;
  public isLoading: boolean = false;
  dataFilter = {};
  schoolId: string = JSON.parse(localStorage.getItem('currentUnit')).id;
  isChecked: boolean = true;
  isCheckUpdate: boolean;

  validationMessages = {
    Name: [
      { type: 'required', message: 'requiredName' },
      { type: 'maxlength', message: 'maxLengthName' },
    ],
    Code: [
      { type: 'required', message: 'requiredCode' },
      { type: 'maxlength', message: 'maxLengthCode' },
      { type: 'pattern', message: 'patternCode' },
    ],
    NumberOfFloor: [
      {
        type: 'required',
        message: 'infrastructure.validators.numberOfFloor.required',
      },
    ],
    IsActive: [
      {
        type: 'required',
        message: 'infrastructure.validators.isActive.required',
      },
    ],
  };
  validationMessagesServer = {
    Name: {},
    Code: {},
    NumberOfFloor: {},
    IsActive: {},
  }
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private listenFirebaseService: ListenFirebaseService,
    private showMessage: ShowMessageService,
    private infrastructureService: infrastructureService
  ) { }

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
      NumberOfFloor: [
        this.dataModal.dataFromParent.NumberOfFloor
          ? this.dataModal.dataFromParent.NumberOfFloor
          : '1',
        [Validators.required],
      ],
      IsActive: [this.dataModal.dataFromParent.IsActive, [Validators.required]],
    });
  }

  createBuildingStaff(dataForm) {
    this.isLoading = true;
    this.dataFilter = {
      Name: dataForm.Name,
      Code: dataForm.Code,
      NumberOfFloor: dataForm.NumberOfFloor,
      SchoolId: this.schoolId,
      IsActive: Number(dataForm.IsActive),
    };
    this.listenFireBase('create', 'classroom-building');
    this.infrastructureService.createBuildingStaff(this.dataFilter).subscribe(
      (res: any) => {
          this.isLoading = false;
      },
      (_err: any) => {
        this.isLoading = false;
          this.validateAllFormFieldsErrorServer(_err.errors);
      }
    );
  }

  updateBuildingStaff(dataForm) {
    this.isLoading = true;
    this.dataFilter = {
      id: this.dataModal.dataFromParent.id,
      Name: dataForm.Name,
      Code: dataForm.Code,
      NumberOfFloor: dataForm.NumberOfFloor,
      IsActive: Number(dataForm.IsActive),
    };
    this.listenFireBase('update', 'classroom-building');
    this.infrastructureService.updateBuildingStaff(this.dataFilter).subscribe(
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
      if (this.dataModal.nameForm == 'update') {
        this.updateBuildingStaff(dataForm);
      } else {
        this.createBuildingStaff(dataForm);
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
    console.log('error:',error)
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
  resetForm() {
    this.infoForm.get('Name').reset();
    this.infoForm.get('Code').reset();
    this.infoForm.get('NumberOfFloor').setValue('1');
    this.infoForm.get('IsActive').setValue('');
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
      clearTimeout(timeId);
      if (ref.status === true) {
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
