import {Routes} from "@angular/router";
import {StudentInfoParentModule} from "../../modules/layout-parent/student-info-parent/student-info-parent.module";

export const ParentRouting: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('src/app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'profile-student',
    loadChildren: () =>
      import('src/app/modules/layout-parent/student-info-parent/student-info-parent.module').then((m) => m.StudentInfoParentModule),
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('src/app/modules/layout-parent/notification-parent/notification-parent.module').then((m) => m.NotificationParentModule),
  },
  {
    path: 'absent-manager',
    loadChildren: () =>
      import('src/app/modules/layout-parent/absent-manager-parent/absent-manager-parent.module').then((m) => m.AbsentManagerParentModule),
  },
]
