import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from 'src/app/_core/core.module';
import { environment } from 'src/environments/environment.firebase';
import { SchoolTenantModule } from '../../school-tenant.module';

import { AssignRoleUserComponent } from './assign-role-user.component';

describe('AssignRoleUserComponent', () => {
  let component: AssignRoleUserComponent;
  let fixture: ComponentFixture<AssignRoleUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignRoleUserComponent ],
      imports: [
        CommonModule,
        CoreModule,
        SchoolTenantModule,
        RouterModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
      ],
      providers: [NgbActiveModal],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignRoleUserComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        userId: '39f8430f-45ad-4d1c-a408-309bf99089bf',
        schoolId: 'a7e3a37d-c9a8-4534-94b1-ce9b7283aecf',
        arrListToAssign: [],
        keyFirebaseAction: 'assign-role-to-user',
        keyFirebaseModule: 'user'
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map true name layout staff', () => {
    expect(component.mapNameLayout('staff')).toEqual('Cán bộ, nhân viên');
  });

  it('should map true name layout teacher', () => {
    expect(component.mapNameLayout('teacher')).toEqual('Giáo viên');
  });

  it('should map true name layout parent', () => {
    expect(component.mapNameLayout('parent')).toEqual('Phụ huynh');
  });

  it('should map true name layout student', () => {
    expect(component.mapNameLayout('student')).toEqual('Học sinh');
  });

  it('should map true name layout tenant', () => {
    expect(component.mapNameLayout('tenant')).toEqual('Quản trị Tenant');
  });

  it('should map true name layout campus', () => {
    expect(component.mapNameLayout('campus')).toEqual('Campus');
  });

  // it('should map true name layout department', () => {
  //   expect(component.mapNameLayout('department')).toEqual('Sở');
  // });

  // it('should map true name layout division', () => {
  //   expect(component.mapNameLayout('division')).toEqual('Phòng');
  // });

  // it('should map true name layout school', () => {
  //   expect(component.mapNameLayout('school')).toEqual('Trường');
  // });

  it('should map false name layout', () => {
    expect(component.mapNameLayout('')).toEqual('--');
  });
});
