import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParentTenantRoutingModule } from './parent-tenant-routing.module';
import { ParentListTenantComponent } from './components/parent-list-tenant/parent-list-tenant.component';
import { ParentDetailTenantComponent } from './components/parent-detail-tenant/parent-detail-tenant.component';
import { ParentCreateTenantComponent } from './components/parent-create-tenant/parent-create-tenant.component';
import { ParentEditTenantComponent } from './components/parent-edit-tenant/parent-edit-tenant.component';
import {CoreModule} from "../../../_core/core.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzPopoverModule} from "ng-zorro-antd/popover";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzSelectModule} from "ng-zorro-antd/select";
import {TRANSLOCO_SCOPE, TranslocoModule} from "@ngneat/transloco";
import {NzInputModule} from "ng-zorro-antd/input";
import {NgxPermissionsModule} from "ngx-permissions";
import {ModalUpdateStatusComponent} from "./modals/modal-update-status/modal-update-status.component";


@NgModule({
  declarations: [
    ParentListTenantComponent,
    ParentDetailTenantComponent,
    ParentCreateTenantComponent,
    ParentEditTenantComponent,
    ModalUpdateStatusComponent,
  ],
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
    NgxPermissionsModule.forChild()
  ],

})
export class ParentTenantModule { }
