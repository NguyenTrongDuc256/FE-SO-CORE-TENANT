/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalFormBehaviorStaffComponent } from './modal-form-behavior-staff.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { BehaviorStaffModule } from '../../behavior-staff.module';
import { environment } from 'src/environments/environment.firebase';
import { BehaviorConfigStaffService } from 'src/app/_services/layout-staff/behavior-staff/behavior-config-staff.service';
import { GeneralService } from 'src/app/_services/general.service';
import { of } from 'rxjs';
fdescribe('ModalFormBehaviorStaffComponent', () => {
  let component: ModalFormBehaviorStaffComponent;
  let fixture: ComponentFixture<ModalFormBehaviorStaffComponent>;
  let behaviorConfigStaffServiceServiceSpy = jasmine.createSpyObj('BehaviorConfigStaffService', [
    'createBehavior', 'updateBehavior', 'getIsApplyTimeNumber'
  ]);

  let generalServiceServiceSpy = jasmine.createSpyObj('GeneralService', [
    'showToastMessageError400'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFormBehaviorStaffComponent],
      imports: [
        RouterTestingModule,
        CoreModule,
        BehaviorStaffModule,
        getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule
      ],
      providers: [
        NgbActiveModal,
        { provide: BehaviorConfigStaffService, useValue: behaviorConfigStaffServiceServiceSpy },
        { provide: GeneralService, useValue: generalServiceServiceSpy },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormBehaviorStaffComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      titleModal: 'Chỉnh sửa tiêu chí đánh giá',
      btnCancel: 'Hủy',
      btnAccept: 'Lưu',
      isHiddenBtnClose: true,
      dataFromParent: {
        behaviorDetail: {
          pointByTimeNumbers
            :
            [{ timeNumber: 1, point: "8" }],
        }
      },
      behaviorCategorySimpleList: [],
      type: 1,
      nameForm: 'update'
    }
    behaviorConfigStaffServiceServiceSpy.getIsApplyTimeNumber.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.initForm();
    expect(component.formGroup.contains('categoryId')).toBeTruthy();
    expect(component.formGroup.contains('code')).toBeTruthy();
    expect(component.formGroup.contains('name')).toBeTruthy();
    expect(component.formGroup.contains('description')).toBeTruthy();
    expect(component.formGroup.contains('isApplyStudent')).toBeTruthy();
    expect(component.formGroup.contains('isApplyTeacher')).toBeTruthy();
    expect(component.formGroup.contains('isApplyHomeroomClass')).toBeTruthy();
    expect(component.formGroup.contains('point')).toBeTruthy();
    expect(component.formGroup.contains('pointByTimeNumbers')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.initForm();
    const form = component.formGroup;
    form.patchValue(
      {
        categoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        code: "moet123",
        name: 'string',
        description: 'string',
        isApplyStudent: true,
        isApplyTeacher: true,
        isApplyHomeroomClass: true,
        // isApplyTimeNumber: true,
        point: 5,
        pointByTimeNumbers: [],
      });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid empty', () => {
    component.initForm();
    const control = component.formGroup.controls['categoryId'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid empty', () => {
    component.initForm();
    const control = component.formGroup.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid maxLength 255', () => {
    component.initForm();
    const control = component.formGroup.controls['name'];
    control.setValue('Witchcraft traditionally means the use of magic or supernatural powers to harm others. A practitioner is a witch. In medieval and early modern Europe, where the term originated, accused witches were usually women who were believed to have attacked their ow');
    expect(control.invalid).toBeTruthy();
  });

});
