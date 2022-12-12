import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NgChartsModule } from 'ng2-charts';
import { CoreModule } from 'src/app/_core/core.module';
import { ChooseIconComponent } from 'src/app/_shared/components/choose-icon/choose-icon.component';
import { MenuManagerRoutingModule } from './menu-manager-routing.module';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ListPackageMenuManagerComponent } from './components/list-package-menu-manager/list-package-menu-manager.component';
import { DetailMenuPackageManagerComponent } from './components/detail-menu-package-manager/detail-menu-package-manager.component';
import { CeratePackageMenuManagerComponent } from './components/cerate-package-menu-manager/cerate-package-menu-manager.component';
import { UpdatePackageMenuManagerComponent } from './components/update-package-menu-manager/update-package-menu-manager.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ModalAssignMenuPackageToSchoolComponent } from './modals/modal-assign-menu-package-to-school/modal-assign-menu-package-to-school.component';

@NgModule({
  declarations: [
    ChooseIconComponent,
    ListPackageMenuManagerComponent,
    DetailMenuPackageManagerComponent,
    CeratePackageMenuManagerComponent,
    UpdatePackageMenuManagerComponent,
    ModalAssignMenuPackageToSchoolComponent
  ],

  imports: [
    CommonModule,
    MenuManagerRoutingModule,
    CoreModule,
    NzIconModule,
    NgChartsModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzTreeModule,
    TranslocoModule,
    NgxPermissionsModule.forChild(),
    DragDropModule,
    NzSelectModule,
    NzDropDownModule
  ],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: "menu-manager" }]
})

export class MenuManagerModule {}
