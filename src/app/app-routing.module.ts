import {CampusLayoutComponent} from './_layouts/campus-layout/campus-layout.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ComponentExampleComponent} from './_shared/components/component-example/component-example.component';
import {AccessDeniedComponent} from "./_shared/components/access-denied/access-denied.component";
import {StaffRouting} from "./_shared/routing/staff-routing";
import {TenantRouting} from "./_shared/routing/tenant-routing";
import {TeacherRouting} from "./_shared/routing/teacher-routing";
import {ParentRouting} from "./_shared/routing/parent-routing";
import {StudentRouting} from "./_shared/routing/student-routing";
import {DepartmentRouting} from "./_shared/routing/department-routing";
import {DivisionRouting} from "./_shared/routing/division-routing";
import {SchoolRouting} from "./_shared/routing/school-routing";
import {CampusRouting} from "./_shared/routing/campus-routing";
import {TenantLayoutComponent} from "./_layouts/tenant-layout/tenant-layout.component";
import {StaffLayoutComponent} from "./_layouts/staff-layout/staff-layout.component";
import {TeacherLayoutComponent} from "./_layouts/teacher-layout/teacher-layout.component";
import {ParentLayoutComponent} from "./_layouts/parent-layout/parent-layout.component";
import {StudentLayoutComponent} from "./_layouts/student-layout/student-layout.component";
import {DepartmentLayoutComponent} from "./_layouts/department-layout/department-layout.component";
import {DivisionLayoutComponent} from "./_layouts/division-layout/division-layout.component";
import {SchoolLayoutComponent} from "./_layouts/school-layout/school-layout.component";
import {AuthGuard} from './_core/_helpers/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'staff', // Layout của cán bộ nhân viên của tenant
    component: StaffLayoutComponent,
    canActivate: [AuthGuard],
    children: StaffRouting,
  },
  {
    path: 'teacher', // Layout của giáo viên
    component: TeacherLayoutComponent,
    canActivate: [AuthGuard],
    children: TeacherRouting,
  },
  {
    path: 'parent', // Layout của phụ huynh
    component: ParentLayoutComponent,
    canActivate: [AuthGuard],
    children: ParentRouting,
  },
  {
    path: 'student', // Layout của học sinh
    component: StudentLayoutComponent,
    canActivate: [AuthGuard],
    children: StudentRouting,
  },
  {
    path: 'department', // Layout sở
    component: DepartmentLayoutComponent,
    canActivate: [AuthGuard],
    children: DepartmentRouting,
  },
  {
    path: 'division', // Layout phòng
    component: DivisionLayoutComponent,
    canActivate: [AuthGuard],
    children: DivisionRouting,
  },
  {
    path: 'school', // Layout trường không sử dụng SO
    component: SchoolLayoutComponent,
    canActivate: [AuthGuard],
    children: SchoolRouting,
  },
  {
    path: 'tenant', // Layout quản trị Tenant
    component: TenantLayoutComponent,
    canActivate: [AuthGuard],
    children: TenantRouting,
  },
  {
    path: 'campus', // Layout quản lý Campus
    component: CampusLayoutComponent,
    canActivate: [AuthGuard],
    children: CampusRouting,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {path: '', redirectTo: '/auth/login', pathMatch: 'full'},

  {path: 'access-denied', component: AccessDeniedComponent},

  {path: 'compo-example', component: ComponentExampleComponent},

  {path: '**', redirectTo: 'error/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
