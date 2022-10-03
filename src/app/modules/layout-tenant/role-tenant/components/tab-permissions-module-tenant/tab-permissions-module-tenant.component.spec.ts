import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsService,
  NgxPermissionsStore,
  NgxRolesStore,
} from 'ngx-permissions';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/_core/core.module';
import { RoleTenantModule } from '../../role-tenant.module';

import { TabPermissionsModuleTenantComponent } from './tab-permissions-module-tenant.component';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { of } from 'rxjs';

describe('TabPermissionsModuleComponent', () => {
  let component: TabPermissionsModuleTenantComponent;
  let fixture: ComponentFixture<TabPermissionsModuleTenantComponent>;

  // let roleServiceSpy = jasmine.createSpyObj('RoleService', [
  //   'getListPermissionRole',
  // ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabPermissionsModuleTenantComponent],
      imports: [RouterTestingModule, CoreModule, RoleTenantModule, getTranslocoModule()],
      providers: [
        NgxPermissionsService,
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPermissionsModuleTenantComponent);
    component = fixture.componentInstance;
    // roleServiceSpy.getListPermissionRole.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
