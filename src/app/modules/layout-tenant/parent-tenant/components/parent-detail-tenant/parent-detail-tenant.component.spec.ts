import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDetailTenantComponent } from './parent-detail-tenant.component';

describe('ParentDetailTenantComponent', () => {
  let component: ParentDetailTenantComponent;
  let fixture: ComponentFixture<ParentDetailTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentDetailTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentDetailTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
