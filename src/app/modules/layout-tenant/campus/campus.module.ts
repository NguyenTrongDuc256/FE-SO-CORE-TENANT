import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_core/core.module';
import { CampusRoutingModule } from './campus-routing.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { NgxPermissionsModule } from "ngx-permissions";
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CampusListManagerTenantComponent } from './components/campus-list-manager-tenant/campus-list-manager-tenant.component';
import { ModalFormCampusTenantComponent } from './modals/modal-form-campus-tenant/modal-form-campus-tenant.component';

@NgModule({
  declarations: [
    CampusListManagerTenantComponent,
    ModalFormCampusTenantComponent
  ],

  imports: [
    CommonModule,
    CampusRoutingModule,
    CoreModule,
    TranslocoModule,
    NgxPermissionsModule.forChild(),
    NzDropDownModule,
    NzCheckboxModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "campus" }]
})

export class CampusModule {}
