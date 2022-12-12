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
import { Building } from 'src/app/_models/layout-staff/declare/infrastructure/Classroom.model';
import { infrastructureService } from 'src/app/_services/layout-staff/declare/infrastructure.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';

import {
  MESSAGE_ERROR_CALL_API,
  REGEX_CODE,
  TIME_OUT_LISTEN_FIREBASE,
} from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-classroom-form-staff',
  templateUrl: './modal-classroom-form-staff.component.html',
  styleUrls: ['./modal-classroom-form-staff.component.scss'],
})
export class ModalClassroomFormStaffComponent implements OnInit {
  @Input() dataModal: any;
  infoForm!: FormGroup;
  public isLoading: boolean = false;
  dataFilter = {};
  isChecked: boolean = true;
  isBuilding: boolean;
  buildingFilter: Building[];
  ismaxBuilding: number = 0;

  validation_messages = {
    Name: [
      { type: 'required', message: 'requiredName' },
      { type: 'maxlength', message: 'maxLengthName' },
    ],
    Code: [
      { type: 'required', message: 'requiredCode' },
      {
        type: 'maxlength',
        message: 'infrastructure.validators.code.maxlengthclass',
      },
      { type: 'pattern', message: 'patternCode' },
    ],
    Floor: [
      {
        type: 'required',
        message: 'infrastructure.validators.numberOfFloor.required',
      },
      {
        type: 'max',
        message: 'infrastructure.validators.numberOfFloor.max',
      },
    ],
    NumberOfSeats: [
      {
        type: 'required',
        message: 'infrastructure.validators.numberOfSeats.required',
      },
    ],
    IsRoom: [
      {
        type: 'required',
        message: 'infrastructure.validators.isRoom.required',
      },
    ],
    IsActive: [
      {
        type: 'required',
        message: 'infrastructure.validators.isActive.required',
      },
    ],
    ClassroomBuildingId: [
      {
        type: 'required',
        message: 'infrastructure.validators.classroomBuildingId.required',
      },
    ],
  };

  validationMessagesServer = {
    Name: {},
    Code: {},
    Floor: {},
    NumberOfSeats: {},
    IsRoom: {},
    IsActive: {},
    ClassroomBuildingId: {},
  };

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private infrastructureService: infrastructureService,
    private listenFirebaseService: ListenFirebaseService
  ) {}

  ngOnInit(): void {
    this.isBuilding = this.dataModal.isDisabledSelect;
    this.initForm(this.dataModal.dataFromParent);
    this.buildingFilter = this.dataModal.buildingFilter;
  }



  provinceChange(): void {
    this.buildingFilter.map((item) => {
      if (item.id == this.infoForm.value.ClassroomBuildingId) {
        this.ismaxBuilding = item.NumberOfFloor;
      }
    });
    this.infoForm.controls['Floor'].setValidators([
      Validators.max(this.ismaxBuilding),
    ]);
  }

  initForm(dataModalForm) {
    this.infoForm = this.fb.group({
      Name: [
        dataModalForm.Name,
        [Validators.required, Validators.maxLength(255)],
      ],
      Code: [
        dataModalForm.Code,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(REGEX_CODE),
        ],
      ],
      Floor: [
        dataModalForm.Floor ? dataModalForm.Floor : '1',
        [Validators.required],
      ],
      NumberOfSeats: [
        dataModalForm.NumberOfSeats ? dataModalForm.NumberOfSeats : '1',
        [Validators.required],
      ],
      IsRoom: [
        dataModalForm.IsRoom ? dataModalForm.IsRoom : '',
        [Validators.required],
      ],
      IsActive: [
        dataModalForm.IsActive == 0 || dataModalForm.IsActive == 1
          ? dataModalForm.IsActive
          : '',
        [Validators.required],
      ],
      ClassroomBuildingId: [
        dataModalForm.ClassroomBuildingId
          ? dataModalForm.ClassroomBuildingId
          : '',
        [Validators.required],
      ],
    });
  }

  createClassStaff(dataForm) {
    this.isLoading = true;
    this.dataFilter = {
      Name: dataForm.Name,
      Code: dataForm.Code,
      Floor: dataForm.Floor,
      NumberOfSeats: dataForm.NumberOfSeats,
      IsRoom: Number(dataForm.IsRoom),
      IsActive: Number(dataForm.IsActive),
      ClassroomBuildingId: dataForm.ClassroomBuildingId,
      IndexOrder: 0,
    };
    this.listenFireBase('create', 'classroom');
    this.infrastructureService.createClassStaff(this.dataFilter).subscribe(
      (res: any) => {
        this.isLoading = false;
      },
      (err: any) => {
        this.isLoading = false;
        this.validateAllFormFieldsErrorServer(err.errors);
      }
    );
  }

  updateClassStaff(dataForm) {
    this.isLoading = true;
    this.dataFilter = {
      id: this.dataModal.dataFromParent.id,
      Name: dataForm.Name,
      Code: dataForm.Code,
      Floor: dataForm.Floor,
      NumberOfSeats: dataForm.NumberOfSeats,
      IsRoom: Number(dataForm.IsRoom),
      IsActive: Number(dataForm.IsActive),
      IndexOrder: 0,
    };
    this.listenFireBase('update', 'classroom');
    this.infrastructureService.updateClassStaff(this.dataFilter).subscribe(
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
        this.createClassStaff(dataForm);
      } else {
        this.updateClassStaff(dataForm);
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
    this.infoForm.get('Floor').setValue('1');
    this.infoForm.get('NumberOfSeats').setValue('1');
    this.infoForm.get('IsRoom').setValue('');
    this.infoForm.get('IsActive').setValue('');
    this.infoForm.get('ClassroomBuildingId').setValue('');
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
