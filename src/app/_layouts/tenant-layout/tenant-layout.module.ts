import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {AsideComponent} from './components/aside/aside.component';
import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';
import {FooterComponent} from './components/footer/footer.component';
import {ScriptsInitComponent} from './components/scripts-init/scripts-init.component';
import {ToolbarComponent} from './components/toolbar/toolbar.component';
import {AsideMenuComponent} from './components/aside/aside-menu/aside-menu.component';
import {TopbarComponent} from './components/topbar/topbar.component';
import {PageTitleComponent} from './components/header/page-title/page-title.component';
import {HeaderMenuComponent} from './components/header/header-menu/header-menu.component';
import {TenantLayoutComponent} from "./tenant-layout.component";
import { CoreModule } from 'src/app/_core/core.module';
import { UserInnerComponent } from './components/header/user-inner/user-inner.component';
import { TranslocoModule, TRANSLOCO_SCOPE } from '@ngneat/transloco';

@NgModule({
  declarations: [
    TenantLayoutComponent,
    AsideComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    ToolbarComponent,
    AsideMenuComponent,
    TopbarComponent,
    PageTitleComponent,
    HeaderMenuComponent,
    UserInnerComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    RouterModule,
    TranslateModule,
    TranslocoModule
  ],
  // providers: [{ provide: TRANSLOCO_SCOPE, useValue: "role" }],
  exports: [],
})
export class TenantLayoutModule {
}
