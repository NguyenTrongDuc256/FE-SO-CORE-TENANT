import { AssignTeacherModule } from './../../modules/layout-staff/assign-teacher/assign-teacher.module';
import { Routes } from "@angular/router";
import { AuthGuard } from "../../_core/_helpers/guard/auth.guard";


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
    path: 'profile-student',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/student-info-staff/student-info-staff.module').then((m) => m.StudentInfoStaffModule)
  },
  {
    path: 'homeroom-class',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/homeroom-class/homeroom-class.module').then((m) => m.HomeroomClassModule)
  },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/employee-staff/employee-staff.module').then((m) => m.EmployeeStaffModule)
  },
  {
    path: 'notification',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/notification-staff/notification-staff.module').then((m) => m.NotificationStaffModule)
  },
  {
    path: 'declare',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/declare-staff/declare.module').then((m) => m.DeclareModule)
  },
  {
    path: 'course',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/course/course.module').then((m) => m.CourseModule)
  },
  {
    path: 'behavior',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/behavior-staff/behavior-staff.module').then((m) => m.BehaviorStaffModule)
  },
  {
    path: 'assign-teacher',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-staff/assign-teacher/assign-teacher.module').then((m) => m.AssignTeacherModule)
  }
]
