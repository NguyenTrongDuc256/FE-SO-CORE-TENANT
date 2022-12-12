/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabDailyCommentStudentCourseTeacherComponent } from './tab-daily-comment-student-course-teacher.component';

describe('TabDailyCommentStudentTeacherComponent', () => {
  let component: TabDailyCommentStudentCourseTeacherComponent;
  let fixture: ComponentFixture<TabDailyCommentStudentCourseTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabDailyCommentStudentCourseTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabDailyCommentStudentCourseTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
