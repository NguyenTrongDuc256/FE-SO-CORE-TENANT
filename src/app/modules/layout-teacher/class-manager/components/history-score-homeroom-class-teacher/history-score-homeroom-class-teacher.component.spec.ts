/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HistoryScoreHomeroomClassTeacherComponent } from './history-score-homeroom-class-teacher.component';

describe('HistoryScoreHomeroomClassTeacherComponent', () => {
  let component: HistoryScoreHomeroomClassTeacherComponent;
  let fixture: ComponentFixture<HistoryScoreHomeroomClassTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryScoreHomeroomClassTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryScoreHomeroomClassTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
