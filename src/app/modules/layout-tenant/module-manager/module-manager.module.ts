import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_core/core.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { NgxPermissionsModule } from "ngx-permissions";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ModuleManagerRoutingModule } from './module-manager-routing.module';
import { ModuleDetailTenantComponent } from './components/module-detail-tenant/module-detail-tenant.component';
import { ModuleListTenantComponent } from './components/module-list-tenant/module-list-tenant.component';
import { ModalPermissionOfModuleTenantComponent } from './modals/modal-permission-of-module-tenant/modal-permission-of-module-tenant.component';

@NgModule({
  declarations: [
    ModuleListTenantComponent,
    ModuleDetailTenantComponent,
    ModalPermissionOfModuleTenantComponent
  ],

  imports: [
    CommonModule,
    ModuleManagerRoutingModule,
    CoreModule,
    TranslocoModule,
    NgxPermissionsModule.forChild(),
    NzDropDownModule,
    NzCheckboxModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "module-manager" }]
})

export class ModuleManagerModule {}
