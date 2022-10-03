import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsStore,
  NgxRolesStore,
} from 'ngx-permissions';
import { BehaviorSubject, of } from 'rxjs';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { RoleService } from 'src/app/_services/layout-tenant/role/role.service';
import { RoleTenantRoutingModule } from '../../role-tenant-routing.module';
import { RoleTenantModule } from '../../role-tenant.module';

import { DetailRoleTenantComponent } from './detail-role-tenant.component';

describe('DetailRoleComponent', () => {
  let component: DetailRoleTenantComponent;
  let fixture: ComponentFixture<DetailRoleTenantComponent>;
  const roleServiceSpy = jasmine.createSpyObj('RoleService', ['detailRole']);
  const paramsSubject = new BehaviorSubject({});
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => 1,
      },
      queryParams: { tab: 'tab1' },
    },
    params: paramsSubject,
    queryParams: { tab: 'tab1' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailRoleTenantComponent],
      imports: [
        RoleTenantRoutingModule,
        CoreModule,
        RoleTenantModule,
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        getTranslocoModule(),
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'role' },
        { provide: RoleService, useValue: roleServiceSpy },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRoleTenantComponent);
    roleServiceSpy.detailRole.and.returnValue(of());
    component = fixture.componentInstance;
    component.isLoading = false;
    component.infoRole = {
      id: '170ed992-7174-47fb-b7f6-032ef3713cf4',
      name: 'Nhân viên',
      code: 'staff',
      layout: 'staff',
      description: '',
      userNumber: 0,
      permissionNumber: 0,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should map true name layout', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameLayout()).toEqual('Cán bộ, nhân viên');
  });

  it('should map false name layout', () => {
    component.isLoading = false;
    component.infoRole.layout = '';
    fixture.detectChanges();
    expect(component.mapNameLayout()).toEqual('--');
  });
});
