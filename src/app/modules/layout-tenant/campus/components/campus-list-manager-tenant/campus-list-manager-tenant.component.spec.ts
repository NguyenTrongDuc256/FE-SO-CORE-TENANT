/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CampusListManagerTenantComponent } from './campus-list-manager-tenant.component';

describe('CampusListManagerTenantComponent', () => {
  let component: CampusListManagerTenantComponent;
  let fixture: ComponentFixture<CampusListManagerTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampusListManagerTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusListManagerTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
