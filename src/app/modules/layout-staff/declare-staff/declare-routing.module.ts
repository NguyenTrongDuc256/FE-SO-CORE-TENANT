import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodStaffComponent } from './components/period-staff/period-staff.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { ProfileListStaffComponent } from './components/profile-list-staff/profile-list-staff.component';
import { BuildingStaffComponent } from './components/infrastructure/building-staff/building-staff.component';
import { ClassroomStaffComponent } from './components/infrastructure/classroom-staff/classroom-staff.component';
import { SubjectListStaffComponent } from './components/subjects/subject-list-staff/subject-list-staff.component';
import { ListSubjectGradeComponent } from './components/subjects/list-subject-grade/list-subject-grade.component';
import { CreateSubjectGradeComponent } from './components/subjects/create-subject-grade/create-subject-grade.component';

const routes: Routes = [
  {
    path: 'subject',
    children: [
      {
        path: 'list',
        component: SubjectListStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.school_access],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: 'subject-grade',
        component: ListSubjectGradeComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.subject_grade_access],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: 'subject-grade/create',
        component: CreateSubjectGradeComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.subject_grade_manager],
            redirectTo: '/access-denied',
          },
        },
      },
    ],
  },
  {
    path: 'infrastructure',
    children: [
      {
        path: 'building',
        component: BuildingStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.classroom_building_access],
            redirectTo: '/access-denied',
          },
        },
      },
      {
        path: 'classroom',
        component: ClassroomStaffComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          permissions: {
            only: [DATA_PERMISSION.classroom_access],
            redirectTo: '/access-denied',
          },
        },
      },
    ],
  },
  {
    path: 'period',
    component: PeriodStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.timetable_period_access],
        redirectTo: '/access-denied',
      },
    },
  },
  {
    path: 'profile-category',
    component: ProfileListStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.file_category_view],
        redirectTo: '/access-denied',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeclareRoutingModule {}
