import { RoleTenantModule } from './../../role-tenant.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRoleTenantComponent } from './list-role-tenant.component';
import { RoleTenantRoutingModule } from '../../role-tenant-routing.module';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_core/core.module';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleService } from 'src/app/_services/layout-tenant/role/role.service';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { of } from 'rxjs';

describe('ListRoleComponent', () => {
  let component: ListRoleTenantComponent;
  let fixture: ComponentFixture<ListRoleTenantComponent>;
  const roleServiceSpy = jasmine.createSpyObj('RoleService', [
    'getList',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRoleTenantComponent ],
      imports: [
        CommonModule,
        RoleTenantRoutingModule,
        CoreModule,
        RoleTenantModule,
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'role' },
        { provide: RoleService, useValue: roleServiceSpy }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRoleTenantComponent);
    roleServiceSpy.getList.and.returnValue(of());
    component = fixture.componentInstance;
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    expect(component).toBeTruthy();
  });

  it('should map true name layout', () => {
    expect(component.mapNameLayout('staff')).toEqual('Cán bộ, nhân viên');
  });

  it('should map false name layout', () => {
    expect(component.mapNameLayout(null)).toEqual('--');
  });
});
