import { SchoolTenantModule } from './../../school-tenant.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.firebase';

import { ModalAssignSubjectComponent } from './modal-assign-subject.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/_core/core.module';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';

describe('ModalAssignSubjectComponent', () => {
  let component: ModalAssignSubjectComponent;
  let fixture: ComponentFixture<ModalAssignSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAssignSubjectComponent],
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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignSubjectComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        arrList: [
          {
            id: '01acef61-436c-4e1a-8b5b-0a5ee18a4ef3',
            tenantId: '00000000-0000-0000-0000-000000000000',
            code: 'HHRAA',
            name: 'Toán học',
            indexOrder: 0,
            isActive: 0,
            subjectType: 1,
            subjectTypeName: 'Môn moet',
          },
        ],
        arrDistrict: [],
        keyFirebaseAction: 'create',
        keyFirebaseModule: 'school-location',
        schoolId: "804fc8ee-d675-4084-990b-26ecc0fdde14"
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
