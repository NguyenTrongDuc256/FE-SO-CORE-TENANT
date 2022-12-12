import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsentManagerParentRoutingModule } from './absent-manager-parent-routing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { AbsentListParentComponent } from './components/absent-list-parent/absent-list-parent.component';
import { ModalCreateAbsentParentComponent } from './modals/modal-create-absent-parent/modal-create-absent-parent.component';
import { ModalUpdateAbsentParentComponent } from './modals/modal-update-absent-parent/modal-update-absent-parent.component';
import { ModalPeriodListParentComponent } from './modals/modal-period-list-parent/modal-period-list-parent.component';
import { ModalAbsentDetailParentComponent } from './modals/modal-absent-detail-parent/modal-absent-detail-parent.component';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    AbsentListParentComponent,
    ModalCreateAbsentParentComponent,
    ModalUpdateAbsentParentComponent,
    ModalPeriodListParentComponent,
    ModalAbsentDetailParentComponent
    
  ],
  imports: [
    CommonModule,
    AbsentManagerParentRoutingModule,
    CommonModule,
    CoreModule,
    TranslocoModule,
    CommonModule,
    NzInputModule,
    NzSelectModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzTreeSelectModule,
    NzCollapseModule,
    NgxPermissionsModule.forChild(),

  ],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: "training"}],
})
export class AbsentManagerParentModule { }
