import {Routes} from "@angular/router";
import {AuthGuard} from "../../_core/_helpers/guard/auth.guard";

export const StaffRouting: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('src/app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'parent',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/parent-staff/parent-staff.module').then((m) => m.ParentStaffModule)
  },
  {
    path: 'student',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/student-staff/student-staff.module').then((m) => m.StudentStaffModule)
  },
  {
    path: 'general-setting',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/general-setting-staff/general-setting-staff.module').then((m) => m.GeneralSettingStaffModule)
  },
  {
    path: 'subject',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/subject-staff/subject-staff.module').then((m) => m.SubjectStaffModule)
  },
]
