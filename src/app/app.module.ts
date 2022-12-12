import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {ClipboardModule} from 'ngx-clipboard';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
// import firebase
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {environment} from "../environments/environment.firebase";
// end import firebase
// transloco
import {TranslocoConfig, TranslocoModule, TRANSLOCO_CONFIG} from "@ngneat/transloco";
import {httpLoader} from "./http-loader";
// #fake-start#
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {NgChartsModule} from 'ng2-charts';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {CoreModule} from './_core/core.module';
import {TokenInterceptor} from './_core/_helpers/token.interceptor';
import {ModalDeleteComponent} from './_shared/modals/modal-delete/modal-delete.component';
import {AccessDeniedComponent} from "./_shared/components/access-denied/access-denied.component";
import {ErrorInterceptor} from './_core/_helpers/error.interceptor';
import {NgxPermissionsModule} from "ngx-permissions";
import {DefaultLayoutModule} from './_layouts/default-layout/default-layout.module';
import {TenantLayoutModule} from "./_layouts/tenant-layout/tenant-layout.module";
import {StaffLayoutModule} from "./_layouts/staff-layout/staff-layout.module";
import {TeacherLayoutModule} from "./_layouts/teacher-layout/teacher-layout.module";
import {ParentLayoutModule} from "./_layouts/parent-layout/parent-layout.module";
import {StudentLayoutModule} from "./_layouts/student-layout/student-layout.module";
import {DepartmentLayoutModule} from "./_layouts/department-layout/department-layout.module";
import {DivisionLayoutModule} from "./_layouts/division-layout/division-layout.module";
import {SchoolLayoutModule} from "./_layouts/school-layout/school-layout.module";
import {CampusLayoutModule} from "./_layouts/campus-layout/campus-layout.module";
import { AuthGuard } from './_core/_helpers/guard/auth.guard';
import { ModalChangePasswordComponent } from './_shared/modals/modal-change-password/modal-change-password.component';
import {
  ModalChangeUsernameCodeComponent
} from "./_shared/modals/modal-change-username-code/modal-change-username-code.component";
import { CommentComponent } from './_shared/components/comment/comment.component';
import { PageNotFoundComponent } from './_shared/components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './_shared/components/server-error/server-error.component';
import { FormExampleComponent } from './_shared/components/form-example/form-example.component';
import {en_US, NZ_I18N, vi_VN} from "ng-zorro-antd/i18n";
import {
  ModalConfirmCancelResultBehaviorComponent
} from "./_shared/modals/modal-confirm-cancel-result-behavior/modal-confirm-cancel-result-behavior.component";


const customLanguagePack = {
  vi_VN,
  ...{
    Empty: {
      description: "Không có dữ liệu"
    }
  }
}


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ModalDeleteComponent,
    AccessDeniedComponent,
    ModalChangePasswordComponent,
    ModalChangeUsernameCodeComponent,
    CommentComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    ServerErrorComponent,
    FormExampleComponent,
    ModalConfirmCancelResultBehaviorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    ClipboardModule,
    AppRoutingModule,
    NgxPermissionsModule.forRoot(),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    DefaultLayoutModule,
    NgxDaterangepickerMd.forRoot(),

    // BEGIN: layout
    StaffLayoutModule,
    TeacherLayoutModule,
    ParentLayoutModule,
    StudentLayoutModule,
    DepartmentLayoutModule,
    DivisionLayoutModule,
    SchoolLayoutModule,
    TenantLayoutModule,
    CampusLayoutModule,
    // END: layout

    NgChartsModule,
    CKEditorModule,
    TranslocoModule,
    CoreModule,
  ],
  providers: [
    AuthGuard,
    httpLoader,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ["en", "vi"],
        reRenderOnLangChange: true,
        fallbackLang: "en",
        defaultLang: localStorage.getItem("language") || "vi",
      } as TranslocoConfig,
    },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: NZ_I18N, useValue: localStorage.getItem("language") && localStorage.getItem("language") === 'en' ? en_US : customLanguagePack}
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
}
