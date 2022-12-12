/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabScoringBehaviorHomeroomClassTeacherComponent } from './tab-scoring-behavior-homeroom-class-teacher.component';

describe('TabScoringBehaviorHomeroomClassTeacherComponent', () => {
  let component: TabScoringBehaviorHomeroomClassTeacherComponent;
  let fixture: ComponentFixture<TabScoringBehaviorHomeroomClassTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabScoringBehaviorHomeroomClassTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabScoringBehaviorHomeroomClassTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
