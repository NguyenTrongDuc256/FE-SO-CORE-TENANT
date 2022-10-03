import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAssignToUserTenantComponent } from './modal-assign-to-user-tenant.component';

describe('ModalAssignToUserTenantComponent', () => {
  let component: ModalAssignToUserTenantComponent;
  let fixture: ComponentFixture<ModalAssignToUserTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAssignToUserTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignToUserTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
