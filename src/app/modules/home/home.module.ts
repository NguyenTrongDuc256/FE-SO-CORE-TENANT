import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HomeRoutingModule } from './home-routing.module';
import { HomeIndexComponent } from './components/home-index/home-index.component';
import { CoreModule } from 'src/app/_core/core.module';

@NgModule({
  declarations: [
    HomeIndexComponent
  ],

  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    NzIconModule,
    NgChartsModule
  ],
})

export class HomeModule {}

