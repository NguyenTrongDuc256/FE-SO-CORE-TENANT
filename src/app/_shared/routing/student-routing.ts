import { NotificationStudentModule } from './../../modules/layout-student/notification-student/notification-student.module';
import {Routes} from "@angular/router";

export const StudentRouting: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('src/app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('src/app/modules/layout-student/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('src/app/modules/layout-student/notification-student/notification-student.module').then((m) => m.NotificationStudentModule),
  },
]
