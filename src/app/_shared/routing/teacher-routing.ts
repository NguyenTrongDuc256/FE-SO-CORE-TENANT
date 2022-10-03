import { StudentRecordsModule } from './../../modules/layout-teacher/student-records/student-records.module';
import {Routes} from "@angular/router";

export const TeacherRouting: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('src/app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'records',
    loadChildren: () =>
      import('src/app/modules/layout-teacher/student-records/student-records.module').then((m) => m.StudentRecordsModule),
  },
]
