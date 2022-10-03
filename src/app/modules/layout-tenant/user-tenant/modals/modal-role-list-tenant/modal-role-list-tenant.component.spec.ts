import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRoleListTenantComponent } from './modal-role-list-tenant.component';

describe('ModalRoleListTenantComponent', () => {
  let component: ModalRoleListTenantComponent;
  let fixture: ComponentFixture<ModalRoleListTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRoleListTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRoleListTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
