import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';

import { ModalListUsersTenantComponent } from './modal-list-users-tenant.component';

describe('ModalListUsersComponent', () => {
  let component: ModalListUsersTenantComponent;
  let fixture: ComponentFixture<ModalListUsersTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalListUsersTenantComponent],
      imports: [CommonModule, CoreModule, getTranslocoModule()],
      providers: [NgbActiveModal],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListUsersTenantComponent);
    component = fixture.componentInstance;
    component.dataModal = {
      dataFromParent: {
        roleId: '8cf4532f-8db5-4593-9d69-5e353b9b86f6',
        listUsers: [
          {
            userRoleId: '8d1dc271-4db2-41ec-b5f5-d9e3923c7f9d',
            id: '89fd04c2-af2f-4ea7-95d6-8644420737dc',
            fullName: 'Nguyễn Công MInh',
            code: 'minhnc',
            username: 'minhnc',
            phone: '0999999999',
            email: 'minhnc@gmail.com',
            unitName: 'Campus Bris 1 (không được xoá)',
            isActive: 1,
          },
          {
            userRoleId: '56831ccb-a236-454d-b95a-e4a7ee81d241',
            id: '89fd04c2-af2f-4ea7-95d6-8644420737dc',
            fullName: 'Nguyễn Công MInh',
            code: 'minhnc',
            username: 'minhnc',
            phone: '0999999999',
            email: 'minhnc@gmail.com',
            unitName: 'Campus Bris 1',
            isActive: 1,
          },
        ],
        collectionSize: 2,
      },
    };
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should map true name status of user-status 0', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(0)).toEqual('notActivated');
  });

  it('should map true name status of user-status 1', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(1)).toEqual('activated');
  });

  it('should map false name status of user', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(3)).toEqual('--');
  });
});
