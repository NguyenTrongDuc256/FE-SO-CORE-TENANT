/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalPermissionOfModuleTenantComponent } from './modal-permission-of-module-tenant.component';

describe('ModalPermissionOfModuleTenantComponent', () => {
  let component: ModalPermissionOfModuleTenantComponent;
  let fixture: ComponentFixture<ModalPermissionOfModuleTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPermissionOfModuleTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPermissionOfModuleTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
