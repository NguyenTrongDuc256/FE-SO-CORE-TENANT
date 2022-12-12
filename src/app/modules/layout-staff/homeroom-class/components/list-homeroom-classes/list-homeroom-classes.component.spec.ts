import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {
  NgxPermissionsConfigurationStore,
  NgxPermissionsService,
  NgxPermissionsStore,
  NgxRolesStore
} from 'ngx-permissions';
import { of } from 'rxjs';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { CoreModule } from 'src/app/_core/core.module';
import { TrainingService } from 'src/app/_services/layout-staff/training/training.service';

import { ListHomeroomClassesComponent } from './list-homeroom-classes.component';

describe('ListHomeroomClassesComponent', () => {
  let component: ListHomeroomClassesComponent;
  let fixture: ComponentFixture<ListHomeroomClassesComponent>;

  let trainingServiceSpy = jasmine.createSpyObj('TrainingService', [
    'getListHomeroomClasses',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListHomeroomClassesComponent],
      imports: [
        CoreModule,
        CommonModule,
        RouterTestingModule,
        NzInputModule,
        NzSelectModule,
        getTranslocoModule(),
      ],
      providers: [
        { provide: TRANSLOCO_SCOPE, useValue: 'training' },
        { provide: TrainingService, useValue: trainingServiceSpy },
        NgxPermissionsService,
        NgxPermissionsStore,
        NgxPermissionsConfigurationStore,
        NgxRolesStore,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHomeroomClassesComponent);
    component = fixture.componentInstance;
    trainingServiceSpy.getListHomeroomClasses.and.returnValue(of());
    component.isLoading = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.isLoading = false;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
