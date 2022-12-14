import { CampusLayoutComponent } from './_layouts/campus-layout/campus-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentExampleComponent } from './_shared/components/component-example/component-example.component';
import { AccessDeniedComponent } from "./_shared/components/access-denied/access-denied.component";
import { StaffRouting } from "./_shared/routing/staff-routing";
import { TenantRouting } from "./_shared/routing/tenant-routing";
import { TeacherRouting } from "./_shared/routing/teacher-routing";
import { ParentRouting } from "./_shared/routing/parent-routing";
import { StudentRouting } from "./_shared/routing/student-routing";
import { DepartmentRouting } from "./_shared/routing/department-routing";
import { DivisionRouting } from "./_shared/routing/division-routing";
import { SchoolRouting } from "./_shared/routing/school-routing";
import { CampusRouting } from "./_shared/routing/campus-routing";
import { TenantLayoutComponent } from "./_layouts/tenant-layout/tenant-layout.component";
import { StaffLayoutComponent } from "./_layouts/staff-layout/staff-layout.component";
import { TeacherLayoutComponent } from "./_layouts/teacher-layout/teacher-layout.component";
import { ParentLayoutComponent } from "./_layouts/parent-layout/parent-layout.component";
import { StudentLayoutComponent } from "./_layouts/student-layout/student-layout.component";
import { DepartmentLayoutComponent } from "./_layouts/department-layout/department-layout.component";
import { DivisionLayoutComponent } from "./_layouts/division-layout/division-layout.component";
import { SchoolLayoutComponent } from "./_layouts/school-layout/school-layout.component";
import { AuthGuard } from './_core/_helpers/guard/auth.guard';
import { PageNotFoundComponent } from './_shared/components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './_shared/components/server-error/server-error.component';
import { CommentComponent } from './_shared/components/comment/comment.component';
import { FormExampleComponent } from './_shared/components/form-example/form-example.component';

export const routes: Routes = [
  {
    path: 'staff', // Layout c???a c??n b??? nh??n vi??n c???a tenant
    component: StaffLayoutComponent,
    canActivate: [AuthGuard],
    children: StaffRouting,
  },
  {
    path: 'teacher', // Layout c???a gi??o vi??n
    component: TeacherLayoutComponent,
    canActivate: [AuthGuard],
    children: TeacherRouting,
  },
  {
    path: 'parent', // Layout c???a ph??? huynh
    component: ParentLayoutComponent,
    canActivate: [AuthGuard],
    children: ParentRouting,
  },
  {
    path: 'student', // Layout c???a h???c sinh
    component: StudentLayoutComponent,
    canActivate: [AuthGuard],
    children: StudentRouting,
  },
  {
    path: 'department', // Layout s???
    component: DepartmentLayoutComponent,
    canActivate: [AuthGuard],
    children: DepartmentRouting,
  },
  {
    path: 'division', // Layout ph??ng
    component: DivisionLayoutComponent,
    canActivate: [AuthGuard],
    children: DivisionRouting,
  },
  {
    path: 'school', // Layout tr?????ng kh??ng s??? d???ng SO
    component: SchoolLayoutComponent,
    canActivate: [AuthGuard],
    children: SchoolRouting,
  },
  {
    path: 'tenant', // Layout qu???n tr??? Tenant
    component: TenantLayoutComponent,
    canActivate: [AuthGuard],
    children: TenantRouting,
  },
  {
    path: 'campus', // Layout qu???n l?? Campus
    component: CampusLayoutComponent,
    canActivate: [AuthGuard],
    children: CampusRouting,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  { path: 'form-example',component: FormExampleComponent },

  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  { path: 'access-denied', component: AccessDeniedComponent },

  { path: 'compo-example', component: ComponentExampleComponent },
  
  { path: 'comment', component: CommentComponent },

  { path: 'compo-example', component: ComponentExampleComponent },

  { path: 'page-not-found', component: PageNotFoundComponent },
  
  { path: 'server-error', component: ServerErrorComponent },

  { path: '**', redirectTo: 'error/404' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
