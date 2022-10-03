import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from '../_shared/components/loading/loading.component';
import { PaginationComponent } from '../_shared/components/pagination/pagination.component';
import { FormatTimePipe } from '../_shared/pipe/format-time.pipe';
import { SubstringPipe } from '../_shared/pipe/substring.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { SingleDatePickerComponent } from '../_shared/components/single-date-picker/single-date-picker.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { NgxPermissionsModule } from "ngx-permissions";
import { TRANSLOCO_SCOPE, TranslocoModule } from '@ngneat/transloco';
import { SwitchLayoutComponent } from '../_shared/components/switch-layout/switch-layout.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { SwitchInfomationLayoutComponent } from '../_shared/components/switch-infomation-layout/switch-infomation-layout.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { OnlyNumberDirective } from 'src/app/_shared/directive/only-number-interger.directive';
@NgModule({
  declarations: [
    LoadingComponent,
    PaginationComponent,
    FormatTimePipe,
    SubstringPipe,
    SingleDatePickerComponent,
    SwitchLayoutComponent,
    SwitchInfomationLayoutComponent,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    OverlayModule,
    NzNotificationModule,
    NgxDaterangepickerMd,
    TranslocoModule,
    NgxPermissionsModule.forChild(),
    NzDropDownModule,
    NzSelectModule
  ],
  exports: [
    LoadingComponent,
    PaginationComponent,
    FormatTimePipe,
    SubstringPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbPaginationModule,
    OverlayModule,
    NzNotificationModule,
    SingleDatePickerComponent,
    NgxPermissionsModule,
    SwitchLayoutComponent,
    SwitchInfomationLayoutComponent,
    OnlyNumberDirective
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: '' }
  ]
})
export class CoreModule {}
