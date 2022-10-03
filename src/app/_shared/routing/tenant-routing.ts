import { SchoolTenantModule } from './../../modules/layout-tenant/school-tenant/school-tenant.module';
import {Routes} from "@angular/router";
import { AuthGuard } from "src/app/_core/_helpers/guard/auth.guard";

export const TenantRouting: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'campus',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/campus/campus.module').then((m) => m.CampusModule),
  },
  {
    path: 'module',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/module-manager/module-manager.module').then((m) => m.ModuleManagerModule),
  },
  {
    path: 'menu-manager',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/menu-manager/menu-manager.module').then((m) => m.MenuManagerModule),
  },
  {
    path: 'role',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/role-tenant/role-tenant.module').then((m) => m.RoleTenantModule)
  },
  {
    path: 'subject',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/subject-tenant/subject.module').then((m) => m.SubjectModule),
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/user-tenant/user-tenant.module').then((m) => m.UserTenantModule)
  },
  {
    path: 'student',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/student-tenant/student-tenant.module').then((m) => m.StudentModule)
  },
  {
    path: 'grade',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/grade/grade.module').then((m) => m.GradeModule)
  },
  {
    path: 'school-year',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/school-year-tenant/school-year-tenant.module').then((m) => m.SchoolYearTenantModule),
  },
  {
    path: 'school',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/school-tenant/school-tenant.module').then((m) => m.SchoolTenantModule)
  },
  {
    path: 'employee',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/employee-tenant/employee-tenant.module').then((m) => m.EmployeeTenantModule)
  },
  {
    path: 'parent',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/parent-tenant/parent-tenant.module').then((m) => m.ParentTenantModule)
  },
  {
    path: 'school',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/layout-tenant/school-tenant/school-tenant.module').then((m) => m.SchoolTenantModule)
  },
]
