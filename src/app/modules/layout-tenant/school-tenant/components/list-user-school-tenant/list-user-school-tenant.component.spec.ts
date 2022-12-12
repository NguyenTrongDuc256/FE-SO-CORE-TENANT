import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { SchoolTenantModule } from './../../school-tenant.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserSchoolTenantComponent } from './list-user-school-tenant.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment.firebase';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchoolService } from 'src/app/_services/layout-tenant/school/school.service';
import { ListenFirebaseService } from 'src/app/_services/listen-firebase.service';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { UserService } from 'src/app/_services/layout-tenant/user/user.service';
import { BehaviorSubject } from 'rxjs';
import { NgxPermissionsConfigurationStore, NgxPermissionsStore, NgxRolesStore } from 'ngx-permissions';
import { getTranslocoModule } from 'src/app/transloco-testing.module';

describe('ListUserSchoolComponent', () => {
  let component: ListUserSchoolTenantComponent;
  let fixture: ComponentFixture<ListUserSchoolTenantComponent>;

  const paramsSubject = new BehaviorSubject({});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
    },
    queryParams: { abc: 'testABC' },
    params: paramsSubject,
  };

  let schoolServiceSpy = jasmine.createSpyObj('SchoolService', [
    'getAnotherInfoToMapSchool',
    'getDetail',
  ]);

  let userServiceSpy = jasmine.createSpyObj('UserService', [
    'getUserList',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserSchoolTenantComponent ],
      imports: [
        SchoolTenantModule,
        RouterModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        getTranslocoModule()
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'school' },
        { provide: SchoolService, useValue: schoolServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        ListenFirebaseService,
        NgxPermissionsStore, NgxPermissionsConfigurationStore, NgxRolesStore
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserSchoolTenantComponent);
    userServiceSpy.getUserList.and.returnValue(of());
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should map true name status of user-status 1', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(1)).toEqual('activated');
  });

  it('should map true name status of user-status 0', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(0)).toEqual('locked');
  });

  it('should map false name status of user', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(3)).toEqual('--');
  });
});
