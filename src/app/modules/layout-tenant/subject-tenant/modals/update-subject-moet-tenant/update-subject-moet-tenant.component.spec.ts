/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UpdateSubjectMoetTenantComponent } from './update-subject-moet-tenant.component';

describe('UpdateSubjectMoetComponent', () => {
  let component: UpdateSubjectMoetTenantComponent;
  let fixture: ComponentFixture<UpdateSubjectMoetTenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSubjectMoetTenantComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubjectMoetTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
