import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssignTeacherService {
  constructor(private http: HttpClient) {}

  // 1. lấy danh sách lớp chủ nhiệm để phân công giáo viên chủ nhiệm
  getListHomeroomClassesToAssign(gradeId: string) {
    return this.http.get(
      `${environment.apiStaff}/api/school-data-declaration/assignment/homeroom-class-list?gradeId=${gradeId}`
    );
  }
  // 2. lấy danh sách giáo viên phân công lớp chủ nhiệm
  getListHomeroomTeachersToAssign(assignmentStatus: number, keyword: string) {
    return this.http.get(
      `${environment.apiStaff}/api/school-data-declaration/assignment/homeroom-class-teacher?keyWord=${keyword}&assignmentStatus=${assignmentStatus}`
    );
  }
  // 3. phân công giáo viên lớp chủ nhiệm
  assignHomeroomTeacher(data: DataAssignTeacher) {
    return this.http.post(
      `${environment.apiStaff}/api/school-data-declaration/assignment/homeroom-class-teacher`,
      data
    );
  }
  // ===============================================
  // 4. lấy danh sách lớp để phân công lớp chủ nhiệm chính
  getListHomeroomClassesToAssignMainTeacher(gradeId: string, assignmentStatus: number = 0, keyword: string = '') {
    return this.http.get(
      `${environment.apiStaff}/api/school-data-declaration/assignment/main-teacher-assignment/homeroom-class-list?gradeId=${gradeId}&assignmentStatus=${assignmentStatus}&keyWord=${keyword}`
    );
  }
  // 5. lấy danh sách giáo viên chủ nhiệm chính phân công lớp chủ nhiệm
  getListMainHomeroomTeachers(keyword: string) {
    return this.http.get(
      `${environment.apiStaff}/api/school-data-declaration/assignment/teacher-list?keyWord=${keyword}`
    );
  }
  // 6. phân công giáo viên chủ nhiệm chính lớp chủ nhiệm
  assignMainHomeroomTeacher(data: DataAssignHomeroomTeacherMain) {
    return this.http.post(
      `${environment.apiStaff}/api/school-data-declaration/assignment/main-homeroom-class-teacher`,
      data
    );
  }
  // =============================================
  // 7. lấy danh sách giáo viên phân công trưởng khối
  getListTeachersToAssignGradeMaster(keyword: string) {
    return this.http.get(
      `${environment.apiStaff}/api/school-data-declaration/assignment/grade-master-list?keyWord=${keyword}`
    );
  }
  // 8. phân công giáo viên trưởng khối
  assignGradeMaster(data:DataAssignGradeMaster) {
    return this.http.post(
      `${environment.apiStaff}/api/school-data-declaration/assignment/grade-master`,
      data
    );
  }
  // ==================================================
  // 9. lấy danh sách giáo viên phân công lớp bộ môn
  getListCourseTeachersToAssign(assignmentStatus: number, keyword: string) {
    return this.http.get(
      `${environment.apiOperateCourseService}/api/school-data-declaration/assignment/course-teacher-assignment?keyWord=${keyword}&assignmentStatus=${assignmentStatus}`
    );
  }
  // 10. lấy danh sách lớp môn học để phân công giáo viên lớp bộ môn
  getListCourseToAssign(gradeId: string, subjectId: string) {
    return this.http.get(
      `${environment.apiOperateCourseService}/api/school-data-declaration/assignment/courses?gradeId=${gradeId}&subjectId=${subjectId}`
    );
  }
  // 11. phân công giáo viên lớp bộ môn
  assignCourseTeacher(data:any) {
    return this.http.post(
      `${environment.apiOperateCourseService}/api/school-data-declaration/assignment/course-teacher`,
      data
    );
  }
}

export interface DataAssignGradeMaster {
  userId?: string
  gradeId: string
  isAssign: number;
}

export interface DataAssignTeacher {
  teacherId: string
  classId: string
  isAssign: number
}
export interface DataAssignHomeroomTeacherMain {
  teacherId: string
  classId: string
  moveOut: number
}
