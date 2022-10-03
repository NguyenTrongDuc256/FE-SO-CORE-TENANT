import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_core/core.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { NgxPermissionsModule } from "ngx-permissions";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MenuManagerRoutingModule } from './menu-manager-routing.module';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { MenuDetailTenantComponent } from './components/menu-detail-tenant/menu-detail-tenant.component';
import { MenuListTenantComponent } from './components/menu-list-tenant/menu-list-tenant.component';

@NgModule({
  declarations: [
    MenuListTenantComponent,
    MenuDetailTenantComponent
  ],

  imports: [
    CommonModule,
    MenuManagerRoutingModule,
    CoreModule,
    TranslocoModule,
    NgxPermissionsModule.forChild(),
    NzDropDownModule,
    NzCheckboxModule,
    NzTreeModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "module-manager" }]
})

export class MenuManagerModule {}
