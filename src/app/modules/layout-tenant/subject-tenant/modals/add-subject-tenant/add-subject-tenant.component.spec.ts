/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AddSubjectTenantComponent } from './add-subject-tenant.component';

describe('AddSubjectTenantComponent', () => {
  let component: AddSubjectTenantComponent;
  let fixture: ComponentFixture<AddSubjectTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddSubjectTenantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubjectTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
