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
import {ParentLayoutComponent} from "./parent-layout.component";
import { CoreModule } from 'src/app/_core/core.module';
import {BreadcrumbsComponent} from "./components/breadcrumbs/breadcrumbs.component";

@NgModule({
  declarations: [
    ParentLayoutComponent,
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
    BreadcrumbsComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    TranslateModule,
    RouterModule
  ],
  exports: [],
})
export class ParentLayoutModule {
}
