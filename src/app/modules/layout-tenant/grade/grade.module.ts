import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradeRoutingModule } from './grade-routing.module';
import { ListGradeTenantComponent } from './list-grade-tenant/list-grade-tenant.component';
import { CoreModule } from 'src/app/_core/core.module';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UpdateGradeTenantComponent } from './update-grade-tenant/update-grade-tenant.component';
import { CreateGradeTenantComponent } from './create-grade-tenant/create-grade-tenant.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';


@NgModule({
  declarations: [
    ListGradeTenantComponent,
    UpdateGradeTenantComponent,
    CreateGradeTenantComponent
  ],
  imports: [
    CommonModule,
    GradeRoutingModule,
    CoreModule,
    NzDropDownModule,
    TranslocoModule,
    NgxPermissionsModule.forChild(),
    NzCheckboxModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "grade" }]

})
export class GradeModule { }
