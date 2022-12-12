/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalConfirmScoreManyStudentInHomeroomClassComponent } from './modal-confirm-score-many-student-in-homeroom-class.component';

describe('ModalConfirmScoreManyStudentInHomeroomClassComponent', () => {
  let component: ModalConfirmScoreManyStudentInHomeroomClassComponent;
  let fixture: ComponentFixture<ModalConfirmScoreManyStudentInHomeroomClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalConfirmScoreManyStudentInHomeroomClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmScoreManyStudentInHomeroomClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
