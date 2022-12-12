import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CommonModule} from "@angular/common";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../../../environments/environment.firebase";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {getTranslocoModule} from "../../../../../transloco-testing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {BehaviorStaffModule} from "../../behavior-staff.module";
import {BehaviorStaffRoutingModule} from "../../behavior-staff-routing.module";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {ScoreManyStudentInCourseStaffComponent} from "./score-many-student-in-course-staff.component";


describe('ScoreManyStudentInCourseStaffComponent', () => {
  let component: ScoreManyStudentInCourseStaffComponent;
  let fixture: ComponentFixture<ScoreManyStudentInCourseStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreManyStudentInCourseStaffComponent],
      imports: [
        BehaviorStaffModule,
        CommonModule,
        BehaviorStaffRoutingModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        NgxDaterangepickerMd.forRoot(),
        TranslocoModule,
        getTranslocoModule(),
        BrowserAnimationsModule,
        RouterModule,
        NzCheckboxModule,
      ],
      providers: [
        {provide: TRANSLOCO_SCOPE, useValue: 'behavior'},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreManyStudentInCourseStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Should create a form with controls', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.formGroup.contains('behaviorScoreType')).toBeTruthy();
    expect(component.formGroup.contains('behaviorCategories')).toBeTruthy();
    expect(component.formGroup.contains('behaviorId')).toBeTruthy();
    expect(component.formGroup.contains('date')).toBeTruthy();
    expect(component.formGroup.contains('studentBehaviors')).toBeTruthy();
  });

  it('Should form valid', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const formGroup = component.formGroup;
    formGroup.patchValue({
      behaviorScoreType: 1,
      behaviorCategories: 'd32f791b-5f11-4c95-ab58-8f069a725799',
      behaviorId: 'd32f791b-5f11-4c95-ab58-8f069a725798',
      date: 1519211809934,
      studentBehaviors: [],
    });
    expect(formGroup.valid).toBeTrue();
  });

  it('Should behaviorCategories invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['behaviorCategories'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should behaviorId invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['behaviorId'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should date invalid required', () => {
    component.isLoading = false;
    fixture.detectChanges();
    const control = component.formGroup.controls['date'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });
});
