import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/_core/core.module';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ListCoursesStaffComponent } from './components/list-courses/list-courses.component';
import { FormCourseLStaffComponent } from './modals/form-course/form-course-staff.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { ListTeachersHomeroomClassComponent } from './components/list-teachers/list-teachers.component';
import { ListStudentsCourseComponent } from './components/list-students/list-students.component';
import { AssignTeacherCourseComponent } from './modals/assign-teacher/assign-teacher.component';
import { AssignStudentCourseComponent } from './modals/assign-student/assign-student.component';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CourseRoutingModule } from './course-routing.module';
import { CourseClassDetailComponent } from './components/course-class-detail/course-class-detail.component';
import { TabDailyCommentStudentCourseComponent } from './tabs/tab-daily-comment-student-course/tab-daily-comment-student-course.component';
import { TabScoringBehaviorCourseStaffComponent } from './tabs/tab-scoring-behavior-course-staff/tab-scoring-behavior-course-staff.component';
import { ModalHistoryStudentInCourseStaffComponent } from './modals/modal-history-student-in-course-staff/modal-history-student-in-course-staff.component';



@NgModule({
  declarations: [
    ListCoursesStaffComponent,
    FormCourseLStaffComponent,
    ListTeachersHomeroomClassComponent,
    ListStudentsCourseComponent,
    AssignTeacherCourseComponent,
    AssignStudentCourseComponent,
    CourseClassDetailComponent,
    TabDailyCommentStudentCourseComponent,
    TabScoringBehaviorCourseStaffComponent,
    ModalHistoryStudentInCourseStaffComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NzInputModule,
    NzSelectModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzTreeSelectModule,
    NzCollapseModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
