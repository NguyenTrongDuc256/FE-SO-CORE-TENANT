/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGradeTenantComponent } from './create-grade-tenant.component';

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

describe('CreateGradeTenantComponent', () => {
  let component: CreateGradeTenantComponent;
  let fixture: ComponentFixture<CreateGradeTenantComponent>;

  const gradeServiceSpy = jasmine.createSpyObj('GradeService', [
    'createGrade',
  ]);

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CreateGradeTenantComponent],
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
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGradeTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('init form', () => {
    expect(component.infoForm.contains('name')).toBeTruthy();
    expect(component.infoForm.contains('code')).toBeTruthy();
    expect(component.infoForm.contains('educationalStages')).toBeTruthy();
    expect(component.infoForm.contains('isActive')).toBeTruthy();
  });

  it('Should name invalid empty', () => {
    const control = component.infoForm.controls['name'];
    control.setValue('');
    expect(control.invalid).toBeTruthy();
  });

});
