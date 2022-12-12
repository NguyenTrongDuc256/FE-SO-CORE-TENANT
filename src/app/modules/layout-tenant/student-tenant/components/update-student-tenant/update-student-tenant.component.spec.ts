/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpdateStudentTenantComponent } from './update-student-tenant.component';

describe('UpdateStudentTenantComponent', () => {
  let component: UpdateStudentTenantComponent;
  let fixture: ComponentFixture<UpdateStudentTenantComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [UpdateStudentTenantComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStudentTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
