import { GENDER } from 'src/app/_shared/utils/constant';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { RouterTestingModule } from '@angular/router/testing';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NgxPermissionsConfigurationStore, NgxPermissionsService, NgxPermissionsStore, NgxRolesStore } from 'ngx-permissions';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { StudentRecordsStaffService } from 'src/app/_services/layout-staff/student-records-staff/student-records-staff.service';
import { environment } from 'src/environments/environment.firebase';

import { ProfileManagerStaffComponent } from './profile-manager-staff.component';

describe('ProfileManagerStaffComponent', () => {
  let component: ProfileManagerStaffComponent;
  let fixture: ComponentFixture<ProfileManagerStaffComponent>;
  let studentRecordsStaffServiceSpy = jasmine.createSpyObj('StudentRecordsStaffService', [
    'getListClass', 'getListStudentOfRecords'
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileManagerStaffComponent ],
      imports: [
        CoreModule,
        CommonModule,
        RouterTestingModule,
        getTranslocoModule(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'student-records' },
        { provide: StudentRecordsStaffService, useValue: studentRecordsStaffServiceSpy },
        NgxPermissionsService,
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileManagerStaffComponent);
    component = fixture.componentInstance;
    studentRecordsStaffServiceSpy.getListClass.and.returnValue(
      of()
    );
    studentRecordsStaffServiceSpy.getListStudentOfRecords.and.returnValue(
      of()
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should get name gender male', () => {
    component.isLoading = false;
    expect(component.getGenderName(GENDER[0].id)).toEqual('genderName.male');
  });

  it('should get name gender female', () => {
    component.isLoading = false;
    expect(component.getGenderName(GENDER[1].id)).toEqual('genderName.female');
  });

  it('should get name gender other', () => {
    component.isLoading = false;
    expect(component.getGenderName(GENDER[2].id)).toEqual('genderName.other');
  });
});
