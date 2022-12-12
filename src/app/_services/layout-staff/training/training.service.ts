import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) { }

  // ===================== module lớp chủ nhiệm ====================
  // 1. danh sách lớp chủ nhiệm
  getListHomeroomClasses(
    bilingualType: number | string,
    keyword: string,
    attendancesStatus: number | string,
    gradeId: number | string,
    isActive: number | string = '',
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get(
      `${environment.apiStaff}/api/homeroom-class?bilingualType=${bilingualType}&pageSize=${pageSize}&pageIndex=${pageIndex}&keyWord=${keyword}&attendancesStatus=${attendancesStatus}&gradeId=${gradeId}&isActive=${isActive}`
    );
  }
  // 2. thêm lớp chủ nhiệm
  createHomeroomClass(data: any) {
    return this.http.post(`${environment.apiStaff}/api/homeroom-class`, data);
  }
  // 3. sửa lớp chủ nhiệm
  updateHomeroomClass(id: string, data: any) {
    return this.http.patch(
      `${environment.apiStaff}/api/homeroom-class/${id}`,
      data
    );
  }
  // 4. lấy dữ liệu moetCategory
  getAnotherInfoToMapHomeroomClass() {
    return this.http.get(`${environment.apiStaff}/api/moet/get-dm-moet`);
  }
  // 5. xóa lớp
  deleteHomeroomClass(data: { id: string }) {
    return this.http.delete(
      `${environment.apiStaff}/api/homeroom-class/${data.id}`
    );
  }
  // 6. lấy danh sách giáo viên trong lớp chủ nhiệm
  getListTeacherHomeroomClass(
    id: string,
    keyword: string,
  ) {
    return this.http.get(
      `${environment.apiStaff}/api/homeroom-class/${id}/homeroom-teachers?keyWord=${keyword}`
    );
  }
  // 7. phân công giáo viên lớp chủ nhiệm lớp
  assignTeacherHomeroomClass(id: string, data: unknown) {
    return this.http.post(
      `${environment.apiStaff}/api/homeroom-class/${id}/homeroom-teachers`,
      data
    );
  }
  // 8. gỡ giáo viên khỏi lớp chủ nhiệm
  removeTeacherHomeroomClass(data: { classId: string; teacherId: string }) {
    return this.http.delete(
      `${environment.apiStaff}/api/homeroom-class/${data?.classId}/homeroom-teachers/${data.teacherId}`
    );
  }
  // 9. lấy danh sách học sinh trong lớp chủ nhiệm
  getListStudentHomeroomClass(
    id: string,
    keyword: string,
  ) {
    return this.http.get(
      `${environment.apiStaff}/api/homeroom-class/${id}/homeroom-students?keyWord=${keyword}`
    );
  }
  // 10. thêm học sinh vào lớp chủ nhiệm
  assignStudentHomeroomClass(
    id: string,
    data: { id: string; studentIds: string[] }
  ) {
    return this.http.post(
      `${environment.apiStaff}/api/homeroom-class/${id}/homeroom-students-add`,
      data
    );
  }
  // 11. gỡ học sinh khỏi lớp chủ nhiệm
  removeStudentHomeroomClass(data: { homeroomClassId: string; studentUserId: string }) {
    let dataInput = {
      studentUserId: data.studentUserId,
      homeroomClassId: data.homeroomClassId
    }
    return this.http.post(
      `${environment.apiStaff}/api/homeroom-class/${data.homeroomClassId}/homeroom-students-remove`, dataInput
    );
  }
  // 12. chi tiết lớp chủ nhiệm
  getDetailHomeroomClass(id: string) {
    return this.http.get(`${environment.apiStaff}/api/homeroom-class/${id}`);
  }
  // 13. lấy danh sách giáo viên để gán vào lớp chủ nhiệm
  getListTeacherToAssignHomeroomClass(
    id: string,
    keyword: string
  ) {
    return this.http.get(
      `${environment.apiStaff}/api/homeroom-class/${id}/teachers?keyWord=${keyword}`
    );
  }
  // 14. lấy danh sách học sinh để gán vào lớp chủ nhiệm
  getListStudentToAssignHomeroomClass(
    id: string,
    pageIndex: number,
    pageSize: number,
    keyword = ''
  ) {
    return this.http.get(
      `${environment.apiStaff}/api/homeroom-class/${id}/students?pageIndex=${pageIndex}&pageSize=${pageSize}&keyWord=${keyword}`
    );
  }
  // 15. lấy danh sách lớp ghép để ghép lớp chủ nhiệm
  getListCompoundClass(type: string, id: string) {
    if (type == 'create') {
      return this.http.get(`${environment.apiStaff}/api/homeroom-class/create`);
    } else
      return this.http.get(
        `${environment.apiStaff}/api/homeroom-class/list/${id}`
      );
  }

  // 16. lấy thông tin cơ bản của lớp chủ nhiệm
  getInfoBasicHomeroomClass(id: string) {
    return this.http.get(
      `${environment.apiStaff}/api/homeroom-class/detail/${id}`
    );
  }

  // 17. lấy danh sách giáo viên để làm gvcn khi tạo/ cập nhật lớp chủ nhiệm
  getListTeacher() {
    return this.http.get(
      `${environment.apiStaff}/api/teacher`
    );
  }
  // 18. lấy danh sách phụ huynh để làm trưởng ban phụ huynh lớp chủ nhiệm
  getListParent(classId: string) {
    return this.http.get(
      `${environment.apiStaff}/api/homeroom-class/${classId}/parent`
    );
  }
  // ==================== end module lớp chủ nhiệm =======================

  // 18. Lấy danh sách đơn xin nghỉ trong lớp
  getListAbsent(data: any) {
    return this.http.get(
      `${environment.apiStaff}/api/${data.homeroomclassId}/absent?fromDate=${data.fromDate}&todDate=${data.todDate}&pageSize=${data.pageSize}&pageIndex=${data.pageIndex}`

    );
  }

  //19. Thêm mới đơn xin nghỉ
  createAbsent(data: any) {
    return this.http.post(
      `${environment.apiStaff}/api/${data.homeroomclassId}/absent`,
      data
    );
  }

  //20. Lấy danh sách học sinh trong lớp
  getListStudentInClass(homeroomclassId: string) {
    return this.http.get(
      `${environment.apiStaff}/api/${homeroomclassId}/absent/create`
    );
  }

  //21. Lấy danh sách tiết học
  getListPeriod() {
    return this.http.get(`${environment.apiStaff}/api/timetable-period`);
  }

  //22. Cập nhật đơn xin nghỉ
  updateAbsent(data: any) {
    return this.http.patch(
      `${environment.apiStaff}/api/${data.homeroomclassId}/absent/${data.id}`,
      data
    );
  }

  //23. Chi tiết đơn xin nghỉ
  getDetailAbsent(data: any) {
    return this.http.get(`${environment.apiStaff}/api/${data.homeroomclassId}/absent/${data.absentId}`);
  }

  // 24. Xóa đơn xin nghỉ
  deleteAbsent(data) {
    return this.http.delete(
      `${environment.apiStaff}/api/${data.homeroom_class_id}/absent/${data.id}`
    );
  }

  // ======================= start module lớp bộ môn ========================================
  // 1. lấy danh sách lớp bộ môn
  getListCourses(
    keyword: string,
    gradeId: string,
    subjectId: string,
    homeroomClassId: string,
    status: string,
    pageIndex: number,
    pageSize: number
  ) {
    return this.http.get(
      `${environment.apiOperateCourseService}/api/course/staff?keyWord=${keyword}&gradeId=${gradeId}&subjectId=${subjectId}&homeroomClassId=${homeroomClassId}&status=${status}&PageIndex=${pageIndex}&PageSize=${pageSize}`
    );
  }
  // 2. thêm mới lớp bộ môn
  createCourse(data: any) {
    return this.http.post(`${environment.apiOperateCourseService}/api/course/staff`, data);
  }
  // 3. cập nhật lớp bộ môn
  updateCourse(id: string, data: any) {
    return this.http.patch(
      `${environment.apiOperateCourseService}/api/course/staff/${id}`,
      data
    );
  }
  // 4. xóa lớp bộ môn
  deleteCourse(data: { id: string }) {
    return this.http.delete(
      `${environment.apiOperateCourseService}/api/course/staff/${data.id}`
    );
  }
  // 5. chi tiết lớp bộ môn
  getDetailCourse(id: string) {
    return this.http.get(
      `${environment.apiOperateCourseService}/api/course/staff/${id}`
    );
  }
  // 6. danh sách học sinh trong lớp
  getListStudentCourse(
    id: string,
    keyword: string
  ) {
    return this.http.get(
      `${environment.apiOperateCourseService}/api/course/staff/enroll/${id}/student?keyWord=${keyword}`
    );
  }
  // 8. gán học sinh vào lớp bộ môn
  assignStudentCourse(data: { id: string; userIds: string[] }) {
    return this.http.post(
      `${environment.apiOperateCourseService}/api/course/staff/enroll/student`,
      data
    );
  }
  // 9. lấy danh sách học sinh để gán vào lớp
  getListStudentToAssignCourse(
    id: string,
    pageIndex: number,
    pageSize: number,
    keyword = '',
    gradeId = '',
    homeroomClassId = ''
  ) {
    return this.http.get(
      `${environment.apiOperateCourseService}/api/course/staff/enroll/students-to-assign-to-course/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}&keyWord=${keyword}&gradeId=${gradeId}&homeroomClassId=${homeroomClassId}`
    );
  }
  // 10. gỡ học sinh khỏi lớp bộ môn
  removeStudentCourse(data: { classId: string; userId: string }) {
    return this.http.patch(
      `${environment.apiOperateCourseService}/api/course/staff/enroll/${data?.classId}/student/${data.userId}`,
      {}
    );
  }
  // 11. danh sách giáo viên trong lớp
  getListTeacherCourse(
    id: string,
    keyword: string
  ) {
    return this.http.get(
      `${environment.apiOperateCourseService}/api/course/staff/enroll/${id}/teacher?keyWord=${keyword}`
    );
  }
  // 12. gán giáo viên vào lớp bộ môn
  assignTeacherCourse(data: { id: string; userIds: string[] }) {
    return this.http.post(
      `${environment.apiOperateCourseService}/api/course/staff/enroll/teacher`,
      data
    );
  }
  // 13. lấy danh sách giáo viên để gán vào lớp
  getListTeacherToAssignCourse(
    id: string,
    pageIndex: number,
    pageSize: number,
    keyword = ''
  ) {
    return this.http.get(
      `${environment.apiOperateCourseService}/api/course/staff/enroll/teachers-to-assign-to-course/${id}?pageIndex=${pageIndex}&pageSize=${pageSize}&keyWord=${keyword}`
    );
  }
  // 14. gỡ giáo viên khỏi lớp bộ môn
  removeTeacherCourse(data: { classId: string; userId: string }) {
    return this.http.patch(
      `${environment.apiOperateCourseService}/api/course/staff/enroll/${data?.classId}/teacher/${data.userId}`,
      {}
    );
  }
  // 15. lấy thông tin cơ bản lớp bộ môn
  getInfoBasicCourse(id: string) {
    return this.http.get(
      `${environment.apiOperateCourseService}/api/course/staff/course-information-for-enroll/${id}`
    );
  }
  // ======================= end module lớp bộ môn ==========================================
}
