/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabDailyCommentStudentTeacherComponent } from './tab-daily-comment-student-teacher.component';

describe('TabDailyCommentStudentTeacherComponent', () => {
  let component: TabDailyCommentStudentTeacherComponent;
  let fixture: ComponentFixture<TabDailyCommentStudentTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDailyCommentStudentTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDailyCommentStudentTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
