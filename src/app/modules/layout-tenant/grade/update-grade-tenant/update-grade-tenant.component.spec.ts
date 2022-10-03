/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateGradeTenantComponent } from './update-grade-tenant.component';
import { CommonModule } from '@angular/common';
import { GradeRoutingModule } from '../grade-routing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GradeModule } from '../grade.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.firebase';
import { GradeService } from 'src/app/_services/layout-tenant/grade/grade.service';
import { NgxPermissionsConfigurationStore, NgxRolesStore } from 'ngx-permissions';

describe('UpdateGradeTenantComponent', () => {
  let component: UpdateGradeTenantComponent;
  let fixture: ComponentFixture<UpdateGradeTenantComponent>;

  const gradeServiceSpy = jasmine.createSpyObj('GradeService', [
    'updateGrade',
  ]);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [UpdateGradeTenantComponent],
      imports: [
        CommonModule,
        GradeRoutingModule,
        CoreModule,
        TranslocoModule,
        RouterModule,
        RouterTestingModule,
        GradeModule,
        BrowserAnimationsModule, getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ],
      providers: [
        NgbActiveModal,
        { provide: TRANSLOCO_SCOPE, useValue: "grade" },
        { provide: GradeService, useValue: gradeServiceSpy },
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGradeTenantComponent);
    component = fixture.componentInstance;
    component.dataModal = {
       dataFromParent: {
      //   code: "1234567890b",
      //   educationalStages: 3, 
      //   id: "99285ab1-5aa1-45df-90b8-c826ce577839",
      //   isActive: 1,
      //   name: "The Battle of the Teutoburg Forest",
      //   tenantId: "e98c5a2f-84d0-43fb-beeb-39f5f758b610",
       },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init form', () => {
    expect(component.infoForm.contains('name')).toBeTruthy();
    expect(component.infoForm.contains('educationalStages')).toBeTruthy();
    expect(component.infoForm.contains('isActive')).toBeTruthy();
  });

  it('Should form valid', () => {
    const form = component.infoForm;
    form.patchValue({
      name: 'Khối 1',
      educationalStages: 3,
      isActive: 1,
    });
    expect(form.valid).toBeTrue();
  });

  it('Should name invalid empty', () => {
    const control = component.infoForm.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

  it('Should name invalid max length', () => {
    const control = component.infoForm.controls['name'];
    control.setValue(
      'When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided When a user clicks the button, the profileForm model is updated with new values for firstName and street. Notice that street is provided'
    );
    expect(control.invalid).toBeTruthy();
  });

});
