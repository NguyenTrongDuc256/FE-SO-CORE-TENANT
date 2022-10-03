/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabStudentPersonInfoStaffComponent } from './tab-student-person-info-staff.component';

describe('TabStudentPersonInfoStaffComponent', () => {
  let component: TabStudentPersonInfoStaffComponent;
  let fixture: ComponentFixture<TabStudentPersonInfoStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabStudentPersonInfoStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabStudentPersonInfoStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
