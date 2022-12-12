/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpdateUsernameCodeTenantComponent } from './update-username-code-tenant.component';

describe('UpdateUsernameCodeTenantComponent', () => {
  let component: UpdateUsernameCodeTenantComponent;
  let fixture: ComponentFixture<UpdateUsernameCodeTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateUsernameCodeTenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsernameCodeTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
