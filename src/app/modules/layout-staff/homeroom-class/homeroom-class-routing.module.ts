import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { FormHomeroomClassComponent } from './components/form-homeroom-class/form-homeroom-class.component';
import { HomeroomClassesDetailStaffComponent } from './components/homeroom-classes-detail-staff/homeroom-classes-detail-staff.component';
import { ListHomeroomClassesComponent } from './components/list-homeroom-classes/list-homeroom-classes.component';
import { ListStudentsHomeroomClassComponent } from './components/list-students/list-students.component';
import { ListTeachersHomeroomClassComponent } from './components/list-teachers/list-teachers.component';
import {
  HistoryScoreHomeroomClassStaffComponent
} from "./components/history-score-homeroom-class-staff/history-score-homeroom-class-staff.component";
import {
  ScoringBehaviorHomeroomClassStaffComponent
} from "../behavior-staff/components/scoring-behavior-homeroom-class-staff/scoring-behavior-homeroom-class-staff.component";
import {
  ScoreStudentInHomeroomClassStaffComponent
} from "../behavior-staff/components/score-student-in-homeroom-class-staff/score-student-in-homeroom-class-staff.component";
import {
  HistoryScoreStudentInHomeroomClassStaffComponent
} from "../behavior-staff/components/history-score-student-in-homeroom-class-staff/history-score-student-in-homeroom-class-staff.component";
import {
  ScoreManyStudentInHomeroomClassStaffComponent
} from "../behavior-staff/components/score-many-student-in-homeroom-class-staff/score-many-student-in-homeroom-class-staff.component";
import {
  TabScoringBehaviorIndexStaffComponent
} from "./tabs/tab-scoring-behavior-index-staff/tab-scoring-behavior-index-staff.component";

const routes: Routes = [
  {
    path:'',
    component: ListHomeroomClassesComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.homeroom_class_access],
        redirectTo: "/access-denied"
      },
    }
  },
  {
    path:'create',
    component: FormHomeroomClassComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.homeroom_class_manager],
        redirectTo: "/access-denied"
      },
    }
  },
  {
    path:'update/:id',
    component: FormHomeroomClassComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.homeroom_class_manager],
        redirectTo: "/access-denied"
      },
    }
  },
  {
    path: 'detail/:id',
    component: HomeroomClassesDetailStaffComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.homeroom_class_access],
        redirectTo: "/access-denied"
      },
    },
    // children: [
    //   {
    //     path: ':userId',
    //     component: HomeroomClassesDetailStaffComponent,
    //     canActivate: [NgxPermissionsGuard],
    //     data: {
    //       permissions: {
    //         only: [DATA_PERMISSION.behavior_grading],
    //         redirectTo: "/access-denied"
    //       },
    //     }
    //   }
    // ],
  },
  {
    path:':id/teacher',
    component: ListTeachersHomeroomClassComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.homeroom_class_access],
        redirectTo: "/access-denied"
      },
    }
  },
  {
    path:':id/student',
    component: ListStudentsHomeroomClassComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.homeroom_class_access],
        redirectTo: "/access-denied"
      },
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeroomClassRoutingModule { }
