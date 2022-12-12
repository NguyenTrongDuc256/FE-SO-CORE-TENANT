/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalDeleteBehaviorCategoryStaffComponent } from './modal-delete-behavior-category-staff.component';

describe('ModalDeleteBehaviorCategoryStaffComponent', () => {
  let component: ModalDeleteBehaviorCategoryStaffComponent;
  let fixture: ComponentFixture<ModalDeleteBehaviorCategoryStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteBehaviorCategoryStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteBehaviorCategoryStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
