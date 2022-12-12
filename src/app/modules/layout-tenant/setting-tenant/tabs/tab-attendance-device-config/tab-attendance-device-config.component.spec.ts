/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabAttendanceDeviceConfigComponent } from './tab-attendance-device-config.component';

describe('TabAttendanceDeviceConfigComponent', () => {
  let component: TabAttendanceDeviceConfigComponent;
  let fixture: ComponentFixture<TabAttendanceDeviceConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAttendanceDeviceConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAttendanceDeviceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
