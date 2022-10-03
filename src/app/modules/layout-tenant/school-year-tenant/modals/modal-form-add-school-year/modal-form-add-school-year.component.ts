import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SchoolYearService} from 'src/app/_services/layout-tenant/school-year/school-year.service';
import {ShowMessageService} from 'src/app/_services/show-message.service';
import {
  MAX_LENGTH_FULL_NAME,
  MESSAGE_ERROR_CALL_API,
  SCHOOL_YEAR_SATUS,
  TIME_OUT_LISTEN_FIREBASE
} from 'src/app/_shared/utils/constant';
import {gradeCirculars, SchoolYearCreate, TermCreate} from 'src/app/_models/layout-tenant/school-year/school-year.model';
import {ListenFirebaseService} from 'src/app/_services/listen-firebase.service';
import {Subscriber, Observable} from 'rxjs';

@Component({
  selector: 'app-modal-form-add-school-year',
  templateUrl: './modal-form-add-school-year.component.html',
  styleUrls: ['./modal-form-add-school-year.component.scss']
})
export class ModalFormAddSchoolYearComponent implements OnInit {
  @Input() dataModal: any;
  isLoading: boolean = false;
  isSubmit: boolean = false;

  schoolYearId: string = '';
  schoolYearList: any[];
  dataGrade: any[];
  dataCirculars: any[];
  tab: string = 'info';

  timePicker: boolean = false;
  schoolYearStatusList: any = SCHOOL_YEAR_SATUS;
  schoolYearInfo: any;
  termsBySchoolYearInfo: any[];
  gradeCircularsList: any[];
  circularsList: any[];
  formGroup: FormGroup;
  validationMessages = {
    name: [
      {
        type: "required",
        message: 'schoolYear.validators.name.required'
      },
      {
        type: "maxlength",
        message: 'schoolYear.validators.name.maxlength'
      }
    ],
    startDate: [
      {
        type: "required",
        message: 'schoolYear.validators.startDate.required'
      },
    ],
    endDate: [
      {
        type: "required",
        message: 'schoolYear.validators.endDate.required'
      },
    ],
    circularsId: [
      {
        type: "required",
        message: 'schoolYear.validators.circularsId.required'
      },
    ]
  };

  get terms() {
    return this.formGroup.get('terms') as FormArray;
  }

  get gradeCirculars() {
    return this.formGroup.get('gradeCirculars') as FormArray;
  }

  constructor(
    private activeModal: NgbActiveModal,
    private schoolYearService: SchoolYearService,
    private showMessageService: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.schoolYearList = this.dataModal.dataFromParent.schoolYears;
    this.dataGrade = this.dataModal.dataFromParent.grades;
    this.dataCirculars = this.dataModal.dataFromParent.circulars;

    if (this.schoolYearList.length > 0) {
      this.schoolYearId = this.schoolYearList[0].id;
      this.schoolYearInfo = this.schoolYearList[0];
      this.termsBySchoolYearInfo = this.schoolYearInfo.terms;
      this.gradeCircularsList = this.schoolYearList[0].gradeCirculars;
      this.circularsList = this.dataModal.dataFromParent.circulars;
      this.initForm();
      this.initTerm();
      this.initGradeCirculars();
    }
  }

  onChangeSchoolYearId() {
    this.schoolYearList.forEach((el: any) => {
      if (el.id == this.schoolYearId) {
        this.schoolYearInfo = el;
        this.termsBySchoolYearInfo = el.terms;
        this.gradeCircularsList = el.gradeCirculars;
        this.initForm();
        this.initTerm();
        this.initGradeCirculars();
      }
    });
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  onChangeTab(value: string): void {
    this.tab = value;
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: [this.schoolYearInfo.name, [Validators.required, Validators.maxLength(MAX_LENGTH_FULL_NAME)]],
      code: [this.schoolYearInfo.code, []],
      startDate: [Number(this.schoolYearInfo.startDate), [Validators.required]],
      endDate: [Number(this.schoolYearInfo.endDate), [Validators.required]],
      isLockGradebookInput: [true, []],
      status: [this.schoolYearInfo.status, []],
      gradeCirculars: this.fb.array([]),
      terms: this.fb.array([]),
    });
  }

  createArrayTerm(data: any, index: number): FormGroup {
    return this.fb.group({
      index: [data.index, [Validators.required]],
      name: [data.name, [Validators.required]],
      startDate: [data.startDate, [Validators.required]],
      endDate: [data.endDate, [Validators.required]],
      isPublishReport: data.isPublishReport ? true : false,
      isCurrent: data.isCurrent ? 1 : 0
    })
  }

  initTerm() {
    if (this.termsBySchoolYearInfo.length > 0) {
      this.termsBySchoolYearInfo.forEach((element: any, index) => {
        this.terms.push(this.createArrayTerm(element, index));
      })
    }
  }

  initGradeCirculars() {
    if (this.dataGrade.length > 0) {
      this.dataGrade.forEach((item: any) => {
        let findItem = this.gradeCircularsList.find(element => element.gradeCode == item.code);
        if (findItem != undefined) {
          this.gradeCirculars.push(this.createArrayGradeCirculars(item, findItem.circularsId));
        } else {
          this.gradeCirculars.push(this.createArrayGradeCirculars(item));
        }
      })
    }
  }

  createArrayGradeCirculars(data: any, circularsId = ''): FormGroup {
    return this.fb.group({
      gradeId: data.id,
      gradeName: data.name,
      circularsId: [circularsId, Validators.required],
    })
  }

  onChangeIsCurrentTerm(stt: number) {
    this.formGroup.value.terms.forEach((el: any, index) => {
      if (index == stt) {
        el.isCurrent = 1
      } else {
        el.isCurrent = 0
      }
    });
  }

  submitForm(dataForm: any) {
    this.isSubmit = true
    let termList: TermCreate[] = [];
    let gradeCircularsList: gradeCirculars[] = [];

    if (dataForm.terms.length > 0) {
      dataForm.terms.forEach((element: any) => {
        termList.push({
          index: element.index,
          name: element.name,
          startDate: Number(element.startDate),
          endDate: Number(element.endDate),
          isPublishReport: element.isPublishReport ? Number(element.isPublishReport) : 0,
          isCurrent: element.isCurrent ? Number(element.isCurrent) : 0
        })
      });
    }

    if (dataForm.gradeCirculars.length > 0) {
      dataForm.gradeCirculars.forEach((element: any) => {
        gradeCircularsList.push({
          gradeId: element.gradeId,
          circularsId: element.circularsId,
        })
      });
    }

    let dataInput: SchoolYearCreate = {
      name: String(dataForm.name),
      code: String(dataForm.code),
      startDate: Number(dataForm.startDate),
      endDate: Number(dataForm.endDate),
      isLockGradebookInput: dataForm.isLockGradebookInput ? Number(dataForm.isLockGradebookInput) : 0,
      status: Number(dataForm.status),
      gradeCirculars: gradeCircularsList,
      terms: termList,
    }

    this.listenFireBase("create", "school-year");
    this.schoolYearService.store(this.dataModal.tenantId, dataInput).subscribe((res: any) => {
      if (res.status == 0) {
        this.isLoading = false;
        this.isSubmit = false;
        this.showMessageService.error(res.msg);
      }
    }, (_err: any) => {
      this.isLoading = false;
      this.isSubmit = false;
    })
  }

  listenFireBase(action: string, module: string) {
    setTimeout(() => {
      if (this.isLoading == true) {
        this.isLoading = false;
        this.isSubmit = false;
        this.showMessageService.error(MESSAGE_ERROR_CALL_API);
      }
    }, TIME_OUT_LISTEN_FIREBASE);
    const listenFb = new Observable((subscriber: Subscriber<any>) => {
      this.listenFirebaseService.checkFireBase(action, module, subscriber);
    });
    listenFb.subscribe((ref) => {
      if (ref.status) {
        this.isLoading = false;
        this.isSubmit = false;
        this.activeModal.close(true);
      } else {
        this.isLoading = false;
        this.isSubmit = false;
      }
    });
  }

  dataStartDate(event: any) {
    if (event != this.formGroup.get('startDate').value){
      this.formGroup.get('startDate').setValue(Number(event));
      this.terms.value.forEach((el, index)=>{
        ((this.formGroup.get('terms') as FormArray).at(index) as FormGroup).get('startDate').patchValue(null);
        ((this.formGroup.get('terms') as FormArray).at(index) as FormGroup).get('endDate').patchValue(null);
      });
    }
  }

  dataEndDate(event: any) {
    if (event != this.formGroup.get('endDate').value){
      this.formGroup.get('endDate').setValue(Number(event));
      this.terms.value.forEach((el, index)=>{
        ((this.formGroup.get('terms') as FormArray).at(index) as FormGroup).get('startDate').patchValue(null);
        ((this.formGroup.get('terms') as FormArray).at(index) as FormGroup).get('endDate').patchValue(null);
      });
    }
  }

  dataTermStartDate(event: any, index: number) {
    if (((this.formGroup.get('terms') as FormArray).at(index) as FormGroup).get('startDate').value != event) {
      ((this.formGroup.get('terms') as FormArray).at(index) as FormGroup).get('startDate').patchValue(Number(event));
    }
  }

  dataTermEndDate(event: any, index: number) {
    if (((this.formGroup.get('terms') as FormArray).at(index) as FormGroup).get('endDate').value != event) {
      ((this.formGroup.get('terms') as FormArray).at(index) as FormGroup).get('endDate').patchValue(Number(event));
    }
  }
}
