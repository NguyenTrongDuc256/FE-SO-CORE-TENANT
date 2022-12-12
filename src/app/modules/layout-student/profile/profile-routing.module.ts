import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { DATA_PERMISSION } from 'src/app/_shared/utils/constant';
import { ListRecordsOfStudentComponent } from './components/list-records-of-student/list-records-of-student.component';

const routes: Routes = [
  {
    path: '',
    component: ListRecordsOfStudentComponent,
    canActivate: [NgxPermissionsGuard],
    data: {
      permissions: {
        only: [DATA_PERMISSION.student_file_user_view],
        redirectTo: "/access-denied"
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
