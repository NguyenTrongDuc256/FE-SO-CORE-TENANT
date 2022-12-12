/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalViewDetailMenuPackageComponent } from './modal-view-detail-menu-package.component';

describe('ModalViewDetailMenuPackageComponent', () => {
  let component: ModalViewDetailMenuPackageComponent;
  let fixture: ComponentFixture<ModalViewDetailMenuPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewDetailMenuPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewDetailMenuPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
