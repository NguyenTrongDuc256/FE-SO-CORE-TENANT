import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate } from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GeneralService } from 'src/app/_services/general.service';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ValidatorNotNull } from 'src/app/_services/validator-custom.service';
import { TIME_OUT_LISTEN_FIREBASE } from 'src/app/_shared/utils/constant';

@Component({
  selector: 'app-assign-teacher-homeroom-class',
  templateUrl: './assign-teacher.component.html',
  styleUrls: ['./assign-teacher.component.scss', '../../helper.scss']
})
export class AssignTeacherHomeroomClassComponent implements OnInit {
  @Input() dataModal: any;
  formSubmit: FormGroup;
  dataFromParent: any;
  isLoading = false;
  arrTeachers = [];
  isLoadingSelect = false;
  searchChange$ = new BehaviorSubject('');
  classId: string;
  shoolYear = localStorage.getItem('currentNameSchoolYear') || '--';
  hasErr = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private listenFirebaseService: ListenFirebaseService,
    private trainingService: TrainingService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.classId = this.dataFromParent.classId;
    const searchSubscription  = (keyword: string): Observable<any> =>
      this.trainingService.getListTeacherToAssignHomeroomClass(this.classId, keyword);
    const optionList$: Observable<any> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(1000))
      .pipe(switchMap(searchSubscription));
    optionList$.subscribe(data => {
      this.arrTeachers = data.data;
      this.isLoadingSelect = false;
    });
    this.initForm();
  }

  initForm() {
    this.formSubmit = this.fb.group({
      UserId: ['',
        [Validators.required, ValidatorNotNull],
      ],
    });
  }

  onSearch(value: string): void {
    this.isLoadingSelect = true;
    this.searchChange$.next(value);
  }

  submit(valueForm) {
    if(this.formSubmit.invalid) return this.hasErr = true;
    let dataInput = {
      HomeroomClassId: this.classId,
      UserId: valueForm.UserId,
    };
    this.isLoading = true;
    this.listenFireBase(
      this.dataFromParent.keyFirebaseAction,
      this.dataFromParent.keyFirebaseModule
    );
    this.dataFromParent.apiSubmit(this.classId, dataInput).subscribe(
      (res: any) => {},
      (err: any) => {
        this.isLoading = false;
        this.generalService.showToastMessageError400(err);
      }
    );
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
        this.hasErr = false;
      } else {
        this.isLoading = false;
        this.hasErr = true;
      }
    });
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

}
