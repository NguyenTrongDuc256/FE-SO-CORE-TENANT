import { StudentRecordsModule } from './../../modules/layout-teacher/student-records/student-records.module';
import { Routes } from "@angular/router";

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
  {
    path: 'class-manager',
    loadChildren: () =>
      import('src/app/modules/layout-teacher/class-manager/class-manager.module').then((m) => m.ClassManagerModule),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('src/app/modules/layout-teacher/notification-teacher/notification-teacher.module').then((m) => m.NotificationTeacherModule),
  },
  {
    path: 'behavior',
    loadChildren: () =>
      import('src/app/modules/layout-teacher/behavior-teacher/behavior-teacher.module').then((m) => m.BehaviorTeacherModule),
  }
]
