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
import { UserInnerComponent } from '../_shared/components/user-inner/user-inner.component';
import { RangeDatePickerComponent } from '../_shared/components/range-date-picker/range-date-picker.component';
import {DialogFileManagerComponent} from "../_shared/modals/dialog-file-manager/dialog-file-manager.component";
import {CkeditorComponent} from "../_shared/components/ckeditor/ckeditor.component";
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import { TimeagoPipe } from '../_shared/pipe/timeago.pipe';
import {AppTextareaAutoresizeDirective} from "../_shared/directive/app-textarea-autoresize.directive";
import { FieldErrorDisplayComponent } from '../_shared/components/field-error-display/field-error-display.component';

@NgModule({
  declarations: [
    LoadingComponent,
    PaginationComponent,
    FormatTimePipe,
    SubstringPipe,
    SingleDatePickerComponent,
    SwitchLayoutComponent,
    SwitchInfomationLayoutComponent,
    OnlyNumberDirective,
    UserInnerComponent,
    RangeDatePickerComponent,
    DialogFileManagerComponent,
    CkeditorComponent,
    TimeagoPipe,
    AppTextareaAutoresizeDirective,
    FieldErrorDisplayComponent
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
    NzSelectModule,
    CKEditorModule,
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
    OnlyNumberDirective,
    UserInnerComponent,
    TranslocoModule,
    RangeDatePickerComponent,
    DialogFileManagerComponent,
    CkeditorComponent,
    CKEditorModule,
    TimeagoPipe,
    AppTextareaAutoresizeDirective,
    FieldErrorDisplayComponent
  ],
  providers: [
    { provide: TRANSLOCO_SCOPE, useValue: '' }
  ]
})
export class CoreModule {}
