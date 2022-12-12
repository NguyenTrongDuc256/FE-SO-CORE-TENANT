/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalHistoryStudentInHomeroomClassTeacherComponent } from './modal-history-student-in-homeroom-class-teacher.component';

describe('ModalHistoryStudentInHomeroomClassTeacherComponent', () => {
  let component: ModalHistoryStudentInHomeroomClassTeacherComponent;
  let fixture: ComponentFixture<ModalHistoryStudentInHomeroomClassTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalHistoryStudentInHomeroomClassTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHistoryStudentInHomeroomClassTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
