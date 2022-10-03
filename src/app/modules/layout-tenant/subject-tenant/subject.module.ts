import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from './subject-routing.module';
import { ListSubjectTenantComponent } from './components/list-subject-tenant/list-subject-tenant.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CoreModule } from 'src/app/_core/core.module';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AddSubjectTenantComponent } from './modals/add-subject-tenant/add-subject-tenant.component';
import { UpdateSubjectMoetTenantComponent } from './modals/update-subject-moet-tenant/update-subject-moet-tenant.component';
import { UpdateSubjectTenantComponent } from './modals/update-subject-tenant/update-subject-tenant.component';


@NgModule({
  declarations: [
    ListSubjectTenantComponent,
    AddSubjectTenantComponent,
    UpdateSubjectMoetTenantComponent,
    UpdateSubjectTenantComponent
  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
    NzInputModule,
    NzSelectModule,
    CoreModule,
    NzPopoverModule,
    NzDropDownModule,
    NzCheckboxModule,
    TranslocoModule,
    NgxPermissionsModule.forChild(),
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "subject" }]

})
export class SubjectModule { }
