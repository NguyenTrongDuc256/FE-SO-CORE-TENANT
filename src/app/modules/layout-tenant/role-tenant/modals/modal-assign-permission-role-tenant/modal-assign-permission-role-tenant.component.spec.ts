import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { environment } from 'src/environments/environment.firebase';
import { RoleTenantModule } from '../../role-tenant.module';

import { ModalAssignPermissionRoleTenantComponent } from './modal-assign-permission-role-tenant.component';

describe('ModalAssignUserRoleComponent', () => {
  let component: ModalAssignPermissionRoleTenantComponent;
  let fixture: ComponentFixture<ModalAssignPermissionRoleTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAssignPermissionRoleTenantComponent],
      imports: [
        CommonModule,
        RoleTenantModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        getTranslocoModule(),
      ],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignPermissionRoleTenantComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        arrAllPermissions: [
          {
            id: 'ec672710-2e53-4a82-bc8a-1829637de00f',
            name: 'Quản lý năm học',
            code: 'module_school_year',
            indexOrder: 44,
            permissions: [
              {
                id: '58e00a1f-642c-4ff6-a065-2a89c810f1f4',
                name: 'Xem năm học',
                code: 'school_year_access',
                indexOrder: 1,
              },
              {
                id: 'd33bf327-e60d-43e3-a482-28ecfa42c13b',
                name: 'Thêm sửa xóa năm học',
                code: 'school_year_manager',
                indexOrder: 2,
              },
            ],
          },
          {
            id: '642e423c-4dea-4fe9-b8a4-8f8afa7d8f8c',
            name: 'Quản lý trường học',
            code: 'module_school',
            indexOrder: 45,
            permissions: [
              {
                id: '94f40b85-b655-439c-b4a6-454958f65408',
                name: 'Xem trường học',
                code: 'school_access',
                indexOrder: 1,
              },
              {
                id: '84677827-2d78-4061-8b44-91af3604c318',
                name: 'Thêm sửa xóa trường học',
                code: 'school_manager',
                indexOrder: 2,
              },
            ],
          },
          {
            id: '67351757-7d8a-47d8-8463-2b4195047616',
            name: 'Thông báo',
            code: 'announcement',
            indexOrder: 93,
            permissions: [
              {
                id: '82fa1011-b3ea-485c-be2d-79544105a667',
                name: 'Cấu hình phạm vi gửi thông báo',
                code: 'announcement_sending_scope_config',
                indexOrder: 1,
              },
            ],
          },
          {
            id: '187b15e0-7ff4-4ec6-b85f-f366c52fe21d',
            name: 'module',
            code: '24242',
            indexOrder: 72,
            permissions: [],
          },
        ],
        keyFirebaseAction: 'update-permission',
        keyFirebaseModule: 'role',
        listPermissionRole: [
          {
            id: '67351757-7d8a-47d8-8463-2b4195047616',
            name: 'Thông báo',
            code: 'announcement',
            indexOrder: 93,
            permissions: [
              {
                id: '82fa1011-b3ea-485c-be2d-79544105a667',
                name: 'Cấu hình phạm vi gửi thông báo',
                code: 'announcement_sending_scope_config',
                indexOrder: 1,
              },
            ],
          }
        ],
        nameForm: 'create',
        roleId: '8cf4532f-8db5-4593-9d69-5e353b9b86f6',
      },
    };

    component.listAllPermission = [
      {
        id: 'ec672710-2e53-4a82-bc8a-1829637de00f',
        name: 'Quản lý năm học',
        code: 'module_school_year',
        indexOrder: 44,
        permissions: [
          {
            id: '58e00a1f-642c-4ff6-a065-2a89c810f1f4',
            name: 'Xem năm học',
            code: 'school_year_access',
            indexOrder: 1,
          },
          {
            id: 'd33bf327-e60d-43e3-a482-28ecfa42c13b',
            name: 'Thêm sửa xóa năm học',
            code: 'school_year_manager',
            indexOrder: 2,
          },
        ],
      },
      {
        id: '642e423c-4dea-4fe9-b8a4-8f8afa7d8f8c',
        name: 'Quản lý trường học',
        code: 'module_school',
        indexOrder: 45,
        permissions: [
          {
            id: '94f40b85-b655-439c-b4a6-454958f65408',
            name: 'Xem trường học',
            code: 'school_access',
            indexOrder: 1,
          },
          {
            id: '84677827-2d78-4061-8b44-91af3604c318',
            name: 'Thêm sửa xóa trường học',
            code: 'school_manager',
            indexOrder: 2,
          },
        ],
      },
      {
        id: '67351757-7d8a-47d8-8463-2b4195047616',
        name: 'Thông báo',
        code: 'announcement',
        indexOrder: 93,
        permissions: [
          {
            id: '82fa1011-b3ea-485c-be2d-79544105a667',
            name: 'Cấu hình phạm vi gửi thông báo',
            code: 'announcement_sending_scope_config',
            indexOrder: 1,
          },
        ],
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should custom data', () => {
    let input = [
      {
        id: 'ec672710-2e53-4a82-bc8a-1829637de00f',
        name: 'Quản lý năm học',
        code: 'module_school_year',
        indexOrder: 44,
        permissions: [
          {
            id: '58e00a1f-642c-4ff6-a065-2a89c810f1f4',
            name: 'Xem năm học',
            code: 'school_year_access',
            indexOrder: 1,
            isChecked: false,
          },
          {
            id: 'd33bf327-e60d-43e3-a482-28ecfa42c13b',
            name: 'Thêm sửa xóa năm học',
            code: 'school_year_manager',
            indexOrder: 2,
            isChecked: false,
          },
        ],
        isChecked: false,
      },
      {
        id: '642e423c-4dea-4fe9-b8a4-8f8afa7d8f8c',
        name: 'Quản lý trường học',
        code: 'module_school',
        indexOrder: 45,
        permissions: [
          {
            id: '94f40b85-b655-439c-b4a6-454958f65408',
            name: 'Xem trường học',
            code: 'school_access',
            indexOrder: 1,
            isChecked: false,
          },
          {
            id: '84677827-2d78-4061-8b44-91af3604c318',
            name: 'Thêm sửa xóa trường học',
            code: 'school_manager',
            indexOrder: 2,
            isChecked: false,
          },
        ],
        isChecked: false,
      },
      {
        id: '67351757-7d8a-47d8-8463-2b4195047616',
        name: 'Thông báo',
        code: 'announcement',
        indexOrder: 93,
        permissions: [
          {
            id: '82fa1011-b3ea-485c-be2d-79544105a667',
            name: 'Cấu hình phạm vi gửi thông báo',
            code: 'announcement_sending_scope_config',
            indexOrder: 1,
            isChecked: false,
          },
        ],
        isChecked: false,
      }
    ];
    expect(component.customData(component.listAllPermission)).toEqual(input);
  });

  it('should find permission', () => {
    expect(
      component.checkPermission(
        '82fa1011-b3ea-485c-be2d-79544105a667',
        '67351757-7d8a-47d8-8463-2b4195047616',
        component.listPermissionRole
      )
    ).toEqual(true);
  });
});
