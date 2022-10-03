/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabStudentPersonInfoTenantComponent } from './tab-student-person-info-tenant.component';

describe('TabStudentPersonInfoTenantComponent', () => {
  let component: TabStudentPersonInfoTenantComponent;
  let fixture: ComponentFixture<TabStudentPersonInfoTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabStudentPersonInfoTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabStudentPersonInfoTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
