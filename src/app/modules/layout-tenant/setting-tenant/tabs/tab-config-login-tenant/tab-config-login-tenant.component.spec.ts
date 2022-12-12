import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabConfigLoginTenantComponent } from './tab-config-login-tenant.component';

describe('TabConfigLoginTenantComponent', () => {
  let component: TabConfigLoginTenantComponent;
  let fixture: ComponentFixture<TabConfigLoginTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabConfigLoginTenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabConfigLoginTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
