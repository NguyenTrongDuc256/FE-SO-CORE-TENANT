/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ScoreStudentInHomeroomClassTeacherComponent } from './score-student-in-homeroom-class-teacher.component';

describe('ScoreStudentInHomeroomClassTeacherComponent', () => {
  let component: ScoreStudentInHomeroomClassTeacherComponent;
  let fixture: ComponentFixture<ScoreStudentInHomeroomClassTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoreStudentInHomeroomClassTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreStudentInHomeroomClassTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
