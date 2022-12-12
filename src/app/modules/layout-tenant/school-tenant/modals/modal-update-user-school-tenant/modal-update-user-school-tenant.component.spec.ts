import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { LocaleService, NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { environment } from 'src/environments/environment.firebase';
import { SchoolTenantModule } from '../../school-tenant.module';

import { ModalUpdateUserSchoolTenantComponent } from './modal-update-user-school-tenant.component';

describe('ModalUpdateUserSchoolTenantComponent', () => {
  let component: ModalUpdateUserSchoolTenantComponent;
  let fixture: ComponentFixture<ModalUpdateUserSchoolTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUpdateUserSchoolTenantComponent],
      imports: [
        CommonModule,
        CoreModule,
        SchoolTenantModule,
        RouterModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        BrowserAnimationsModule,
        NgxDaterangepickerMd.forRoot(),
        getTranslocoModule(),
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: "school" },
        NgbActiveModal,
        LocaleService
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateUserSchoolTenantComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        user: {
          id: '39f8430f-45ad-4d1c-a408-309bf99089bf',
          avatar:
            'https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/11/04/files/uploads/1667560731_1667560731946-210130862_338478321201448_851170663411388589_n.jpg',
          fullname: 'Đỗ Thùy Dung 123',
          code: 'omt1',
          username: 'dungdt',
          gender: 2,
          email: 'dungdt@omt.vn',
          phone: '0349921357',
          birthday: 910803600,
          isActive: 1,
          isLogin: 1,
          isChangePassword: 1,
          roleNumber: 5,
        },
        keyFirebaseAction: 'update',
        keyFirebaseModule: 'user',
        userId: "39f8430f-45ad-4d1c-a408-309bf99089bf",
        nameForm: 'update'
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get extension img jpeg', () => {
    expect(component.getExtension('image/jpeg')).toEqual('jpeg');
  });

  it('should get extension img jpg', () => {
    expect(component.getExtension('image/jpg')).toEqual('jpg');
  });

  it('should get extension img png', () => {
    expect(component.getExtension('image/png')).toEqual('png');
  });
});
