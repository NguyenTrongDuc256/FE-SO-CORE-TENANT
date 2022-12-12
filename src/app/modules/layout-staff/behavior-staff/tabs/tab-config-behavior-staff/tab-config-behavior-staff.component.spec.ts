import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabConfigBehaviorStaffComponent } from './tab-config-behavior-staff.component';
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
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('TabConfigBehaviorStaffComponent', () => {
    let component: TabConfigBehaviorStaffComponent;
    let fixture: ComponentFixture<TabConfigBehaviorStaffComponent>;
    let behaviorConfigStaffServiceServiceSpy = jasmine.createSpyObj('BehaviorConfigStaffService', [
        'behaviorConfigInfo', 'updateBehaviorConfig'
    ]);
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TabConfigBehaviorStaffComponent],
            imports: [
                RouterTestingModule,
                CoreModule,
                BehaviorStaffModule,
                getTranslocoModule(),
                AngularFireModule.initializeApp(environment.firebaseConfig),
                AngularFireDatabaseModule,
                BrowserAnimationsModule,
                FormsModule
            ],
            providers: [
                NgbActiveModal,
                { provide: BehaviorConfigStaffService, useValue: behaviorConfigStaffServiceServiceSpy },
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabConfigBehaviorStaffComponent);
        component = fixture.componentInstance;
        component.behaviorConfigData = {
            gradingBackdate: 1,
            cancellingBackdate: 1,
            resetTimeNumberType: 1,
            warningPoint: null
        };
        behaviorConfigStaffServiceServiceSpy.behaviorConfigInfo.and.returnValue(of());
        behaviorConfigStaffServiceServiceSpy.updateBehaviorConfig.and.returnValue(of());
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should create a form with controls', () => {
        component.behaviorConfigData = {
            gradingBackdate: 1,
            cancellingBackdate: 1,
            resetTimeNumberType: 1,
            warningPoint: null
        };
        component.initForm();
        expect(component.formGroup.contains('gradingBackdate')).toBeTruthy();
        expect(component.formGroup.contains('cancellingBackdate')).toBeTruthy();
        expect(component.formGroup.contains('resetTimeNumberType')).toBeTruthy();
        expect(component.formGroup.contains('warningPoint')).toBeTruthy();
    });

    it('Should form valid', () => {
        component.initForm();
        const form = component.formGroup;
        form.patchValue(
            {
                gradingBackdate: 1,
                cancellingBackdate: 1,
                resetTimeNumberType: 1,
                warningPoint: null
            });
        expect(form.valid).toBeTrue();
    });

    it('Should name invalid empty', () => {
        component.initForm();
        const control = component.formGroup.controls['gradingBackdate'];
        control.setValue('');
        expect(control.invalid).toBeTruthy();
    });

    it('Should code invalid pattern', () => {
        component.initForm();
        const control = component.formGroup.controls['gradingBackdate'];
        control.setValue('@@@@@@');
        expect(control.invalid).toBeTruthy();
    });

    it('Should name invalid empty', () => {
        component.initForm();
        const control = component.formGroup.controls['cancellingBackdate'];
        control.setValue('');
        expect(control.invalid).toBeTruthy();
    });

    it('Should code invalid pattern', () => {
        component.initForm();
        const control = component.formGroup.controls['cancellingBackdate'];
        control.setValue('@@@@@@');
        expect(control.invalid).toBeTruthy();
    });




});
