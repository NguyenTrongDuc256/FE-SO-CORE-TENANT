import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';

import { ModalViewPermissionTenantComponent } from './modal-view-permission-tenant.component';

describe('ModalViewPermissionTenantComponent', () => {
  let component: ModalViewPermissionTenantComponent;
  let fixture: ComponentFixture<ModalViewPermissionTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalViewPermissionTenantComponent],
      imports: [CommonModule, CoreModule,getTranslocoModule()],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewPermissionTenantComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        roleId: 'cc74b476-8cbf-47bb-9218-588bfdda0f87',
        listPermissions: [
          {
            id: '2998935e-8507-4760-ae29-233292a1832e',
            name: 'Quản lý học sinh',
            code: 'student_manager',
            indexOrder: 82,
            permissions: [
              {
                id: 'd0bc0f7e-a604-42d7-a93e-c422743a2754',
                name: 'Xem thông tin học sinh',
                code: 'student_view',
                indexOrder: 1,
              },
              {
                id: '8d95e43a-1232-412d-a848-370f065e3f09',
                name: 'Cập nhật thông tin học sinh',
                code: 'student_modify',
                indexOrder: 2,
              },
            ],
          },
        ],
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
