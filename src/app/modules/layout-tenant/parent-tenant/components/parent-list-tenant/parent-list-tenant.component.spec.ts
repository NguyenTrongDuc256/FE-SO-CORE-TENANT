import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentListTenantComponent } from './parent-list-tenant.component';
import {CommonModule} from "@angular/common";
import {ParentTenantRoutingModule} from "../../parent-tenant-routing.module";
import {CoreModule} from "../../../../../_core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TranslocoModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";

describe('ParentListTenantComponent', () => {
  let component: ParentListTenantComponent;
  let fixture: ComponentFixture<ParentListTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentListTenantComponent ],
      imports: [
        CommonModule,
        ParentTenantRoutingModule,
        CoreModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzPopoverModule,
        NzRadioModule,
        NzDropDownModule,
        NzSelectModule,
        TranslocoModule,
        NzInputModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentListTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test function getGenderName', () => {
    const gender = 1;
    const genderName = component.getGenderName(gender);
    expect(genderName).toBe('en.genderName.male');
  });
});
