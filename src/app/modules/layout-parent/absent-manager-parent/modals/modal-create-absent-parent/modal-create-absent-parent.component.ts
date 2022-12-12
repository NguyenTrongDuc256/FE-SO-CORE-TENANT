import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import * as moment from 'moment';
import { Observable, Subscriber } from 'rxjs';
import { GeneralService } from 'src/app/_services/general.service';
import { AbsentManagerParentService } from 'src/app/_services/layout-parent/absent-manager-parent/absent-manager-parent.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-modal-create-absent-parent',
  templateUrl: './modal-create-absent-parent.component.html',
  styleUrls: ['./modal-create-absent-parent.component.scss']
})
export class ModalCreateAbsentParentComponent implements OnInit {
  @Input() dataModal: any;
  isLoading: boolean = false;
  formGroup!: FormGroup;
  linkUploadFile: string;
  dateNow = moment().format('X');
  timePicker: boolean = false;
  fromDate: "";
  toDate: "";
  txtSelect: string = 'training.selectStudent';
  select: string = 'select';
  nzNotFoundContent: string = 'training.notFoundContent';
  fileName: string = '';
  file: any = null;
  dayMonthAbsent: Array<string> = [];
  indexArrayAbsent: number;
  value: string[] = [];
  nodes: any = [];
  period: any = [];
  listStudent: Array<any> = [];
  bus: Array<any> = []
  meal: Array<any> = []

  constructor(
    public activeModal: NgbActiveModal,
    private showMessage: ShowMessageService,
    private absentManagerParentService: AbsentManagerParentService,
    private listenFirebaseService: ListenFirebaseService,
    private fb: FormBuilder,
    private generalService: GeneralService,
  ) { }

  ngOnInit(): void {
    this.getListStudentInClass();
    this.getListPeriod();
    this.initForm();
  }

  get dataAbsent() {
    return this.formGroup.get('dataAbsent') as FormArray;
  }

  getFormGroupOfFormArray(index: number) {
    return this.dataAbsent.controls[index] as FormGroup;
  }

  getListStudentInClass() {
    this.absentManagerParentService.getListStudentInClass().subscribe((res: any) => {
      this.listStudent = res.data.student;
      this.isLoading = false;
    },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);

      }
    );
  }

  getListPeriod() {
    this.absentManagerParentService.getListPeriod().subscribe((res: any) => {
      this.period = res.data;
      this.period.forEach(item => {
        this.nodes.push({ title: item.Name + " (" + item.TimeStart + "-" + item.TimeEnd + ")", key: item.id })
      })

      this.isLoading = false;
    },
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);

      }
    );
  }

  initForm() {
    this.formGroup = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      studentId: ['', Validators.required],
      reason: [''],
      dataAbsent: this.fb.array([])
    });
  }

  addDataAbsent(date?: any, index?: number) {
    let add = this.formGroup.get('dataAbsent') as FormArray;
    add.push(this.fb.group({
      allDay: [false],
      date: [''],
      period: [[], Validators.required],
      busId: [''],
      meal: this.fb.array([]),
    }))
    const addMeal = add.at(index).get('meal') as FormArray;
    this.meal.forEach(item => {
      addMeal.push(this.fb.group({
        id: [item.mealId],
        name: [item.mealName],
        checked: false
      }))
    })

    if (date) {
      this.dayMonthAbsent[index] = moment(date).format('DD/MM/YYYY');//hiển thị ngày tại vị trí index
    }
    let timeStampDate = moment(date).format('X');
    ((this.formGroup.get('dataAbsent') as FormArray).at(index) as FormGroup).get('date').patchValue(Number(timeStampDate));
  }

  getMeal(item) {
    return item.controls.meal.controls
  }

  checkedAll(i: number) {
    if (this.dataAbsent.at(i).get('allDay').value) {
      const data = this.nodes.map(item => { return item.key })
      this.dataAbsent.at(i).get('period').setValue(data)
    }
    else {
      this.dataAbsent.at(i).get('period').setValue([])
    }
  }

  selectTreedAll(i: number) {
    if (this.dataAbsent.at(i).get('period').value.length === this.nodes.length) {
      this.dataAbsent.at(i).get('allDay').setValue(true)
    }
    else {
      this.dataAbsent.at(i).get('allDay').setValue(false)
    }
  }

  resetDataAbsent() {
    (this.formGroup.get('dataAbsent') as FormArray).clear();
  }

  createAbsent() {
    this.isLoading = true;
    this.formGroup.value.dataAbsent.forEach(item => {
      item.meal = item.meal.filter(meal => { return meal.checked }).map(meal => { return meal.id });
    })

    let dataRequest = {
      studentId: this.formGroup.value.studentId,
      fromDate: this.formGroup.value.fromDate,
      toDate: this.formGroup.value.toDate,
      reason: this.formGroup.value.reason,
      attachedFile: this.linkUploadFile,
      data: this.formGroup.value.dataAbsent
    }
    this.listenFireBase('create', 'absent_parent');
    this.absentManagerParentService.createAbsent(dataRequest).subscribe((res: any) => {

    }, (err: any) => {
      this.isLoading = false;
      this.validateAllFormFieldsErrorServer(err.errors)

    });
  }

  onSubmit() {
    // this.createAbsent();
    if (this.formGroup.valid) {
      this.createAbsent();
    } else {
      this.validateAllFormFields(this.formGroup);
    }
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

  validateAllFormFieldsErrorServer(error: any) {
    Object.keys(error).forEach(key => {
      let arrKey = String(key).split('.');
      let indexKey = '';
      if (arrKey.length == 1) {
        this.validationMessagesServer[arrKey[0]] = {
          message: error[key]
        }
      } else {
        arrKey.forEach((itemKey: any) => {
          if (!isNaN(itemKey)) {
            indexKey += `${itemKey}`;
          }
          Object.keys(this.validationMessagesServer).forEach(itemMessage => {
            if (itemMessage == arrKey[arrKey.length - 1]) {
              if (indexKey) {
                this.validationMessagesServer[itemMessage][indexKey] = {
                  message: error[key]
                }
              }
            }
          });
        })
      }
    });
  }

  getMessageServer(key, i) {
    let indexKey = `${i}`;
    return this.validationMessagesServer[key][indexKey];
  }

  dataFromDate(event: any) {
    if (this.formGroup.value.fromDate != event) {
      this.fromDate = event;
      this.formGroup.get('fromDate').setValue(Number(event));
      this.getRangeDate();
    }
  }

  dataToDate(event: any) {
    if (this.formGroup.value.toDate != event) {
      this.toDate = event;
      this.formGroup.get('toDate').setValue(Number(event));
      this.getRangeDate();
    }
  }

  getRangeDate() {
    if (this.formGroup.get('fromDate').value != '' && this.formGroup.get('fromDate').value != null && this.formGroup.get('toDate').value != '' && this.formGroup.get('toDate').value != null) {
      this.resetDataAbsent();
      this.indexArrayAbsent = -1;
      const fromDateee = moment(this.formGroup.get('fromDate').value * 1000).format('MM-DD-YYYY');
      const toDateee = moment(this.formGroup.get('toDate').value * 1000).format('MM-DD-YYYY');

      let start = new Date(fromDateee);
      let end = new Date(toDateee);
      //let range = [];
      while (start <= end) {
        this.indexArrayAbsent++;
        this.addDataAbsent(start, this.indexArrayAbsent);
        //this.pushDateToItemAbsent(this.indexArrayAbsent, start);
        //range.push({ text: moment(start).format('DD-MM-YYYY'), timeStamp: moment(start).format('X') });
        let newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);
      }
    }
  }

  //upload file
  uploadFile() {
    document.getElementById('input-file-upload-hoc-sinh').click();
  }

  onFileChange(event) {
    this.isLoading = true;
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.slice(-5) == '.xlsx' || event.target.files[0].name.slice(-4) == '.xls') {
        this.fileName = event.target.files[0].name;
        this.file = file;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.showMessage.warning('Không đúng định dạng file')
      }
    }
    if (this.file) {
      this.isLoading = true;
      let formData: FormData = new FormData();
      formData.append('upload', this.file);
      this.generalService.uploadFile(formData).subscribe((res: any) => {

        this.isLoading = false;
        this.linkUploadFile = res.default;
      }, (_err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(_err);
      })
    }
  }
  //end upload file

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

  validationMessages = {
    'studentId': [
      { type: 'required', message: translate('training.requiredCompoundStudent') }
    ],
    'fromDate': [
      { type: 'required', message: translate('training.requiredDate') }
    ],
    'toDate': [
      { type: 'required', message: translate('training.requiredDate') }
    ],
    'period': [
      { type: 'required', message: translate('training.requiredPeriod') }
    ],

  }

  validationMessagesServer = {
    studentId: {},
    fromDate: {},
    toDate: {},
    period: {}

  }

}
