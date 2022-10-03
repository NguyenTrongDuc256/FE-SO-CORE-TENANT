import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPermissionsConfigurationStore, NgxPermissionsService, NgxPermissionsStore, NgxRolesStore } from 'ngx-permissions';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { RoleTenantModule } from '../../role-tenant.module';

import { TabUserRoleTenantComponent } from './tab-user-role-tenant.component';

describe('TabUserModuleComponent', () => {
  let component: TabUserRoleTenantComponent;
  let fixture: ComponentFixture<TabUserRoleTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabUserRoleTenantComponent ],
      imports: [RouterTestingModule, CoreModule, RoleTenantModule, getTranslocoModule()],
      providers: [
        NgxPermissionsService,
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUserRoleTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should map true name status of user-status 1', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(1)).toEqual('Kích hoạt');
  });

  it('should map true name status of user-status 0', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(0)).toEqual('Bị khóa');
  });

  it('should map false name status of user', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component.mapNameStatus(3)).toEqual('--');
  });
});
