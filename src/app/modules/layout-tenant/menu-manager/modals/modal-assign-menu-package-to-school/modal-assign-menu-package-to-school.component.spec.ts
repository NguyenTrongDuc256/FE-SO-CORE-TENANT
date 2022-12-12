/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalAssignMenuPackageToSchoolComponent } from './modal-assign-menu-package-to-school.component';

describe('ModalAssignMenuPackageToSchoolComponent', () => {
  let component: ModalAssignMenuPackageToSchoolComponent;
  let fixture: ComponentFixture<ModalAssignMenuPackageToSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAssignMenuPackageToSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAssignMenuPackageToSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
